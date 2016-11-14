#!/usr/bin/env node
/**
 * v0.1.0 Benchmark：nofault hello-kernel vs 原生 node:http 基线
 *
 * 零第三方依赖：手写并发压测器（keep-alive + 固定连接池 + 固定时长）。
 * 为避免冷启动偏差，采用**多轮交替**测量，最终取各目标的中位数轮次。
 *
 * 用法：
 *   node bench.mjs [--duration=10] [--connections=64] [--warmup=2] [--rounds=3] [--report]
 */
import { request, Agent } from 'node:http';
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '../..');

function parseArgs() {
  const out = { duration: 10, connections: 64, warmup: 2, rounds: 3, report: false };
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

/**
 * 启动一个被压测的服务进程，并从其 stdout 解析出实际端口。
 *
 * 关键：**被测服务一律独立进程**，压测器独占自己的进程，
 * 否则压测器与服务端争抢 CPU，测量值会失真。
 */