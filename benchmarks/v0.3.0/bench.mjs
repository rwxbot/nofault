#!/usr/bin/env node
/**
 * v0.3.0 Benchmark
 *
 *  A. 上下文微基准（进程内）：AsyncLocalStorage 的建立与读取成本
 *  B. HTTP 端到端：nofault v0.3.0 vs 裸 node:http
 *
 * 用法：
 *   node bench.mjs [--duration=5] [--connections=32] [--warmup=1] [--rounds=3] [--report]
 */
import { request, Agent } from 'node:http';
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '../..');

function parseArgs() {
  const out = { duration: 5, connections: 32, warmup: 1, rounds: 3, report: false };
  for (const a of process.argv.slice(2)) {
    const [k, v] = a.replace(/^--/, '').split('=');
    if (k === 'report') out.report = true;
    else if (k === 'duration') out.duration = Number(v);
    else if (k === 'connections') out.connections = Number(v);
    else if (k === 'warmup') out.warmup = Number(v);
    else if (k === 'rounds') out.rounds = Number(v);
  }
  return out;
}
const opts = parseArgs();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------------------------------------------------------------- A. 上下文微基准
async function contextMicroBench() {
  const { RequestContext, requestContextStore } = await import(
    join(repoRoot, 'packages/context/dist/index.js')
  );

  const N = 300_000;