#!/usr/bin/env node
/**
 * v0.9.0 Benchmark —— 分布式原语的成本与开销
 *
 * 这一版测两件事：
 * 1. **ID 生成够不够快**：它是每条写路径都要跑的东西
 * 2. **加锁到底多贵**：知道这个数字，才能判断"要不要加这把锁"
 *
 * 用法：node bench.mjs [--iterations=50000] [--report]
 */
import { writeFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '../..');

const args = { iterations: 50000, report: false };
for (const a of process.argv.slice(2)) {
  const [k, v] = a.replace(/^--/, '').split('=');
  if (k === 'report') args.report = true;
  else if (k === 'iterations') args.iterations = Number(v);
}

const { Snowflake, MemoryLockBackend, DistributedLock, EventBus } = await import(
  join(repoRoot, 'packages/micro/dist/index.js')
);

function round(n) {
  return Math.round(n * 100) / 100;
}

function bench(name, fn, iterations = args.iterations) {
  for (let i = 0; i < Math.min(1000, iterations); i++) fn(i);
  const samples = [];
  for (let i = 0; i < iterations; i++) {
    const t = process.hrtime.bigint();
    fn(i);
    samples.push(Number(process.hrtime.bigint() - t) / 1e6);
  }
  samples.sort((a, b) => a - b);
  const mean = samples.reduce((a, b) => a + b, 0) / samples.length;
  return {
    name,
    meanUs: round(mean * 1000),
    opsPerSec: round(1000 / mean),
    p95Us: round(samples[Math.floor(samples.length * 0.95)] * 1000),
  };
}

// --- A. Snowflake ---
const gen = new Snowflake({ workerId: 1, datacenterId: 1 });
const bigintId = bench('snowflake -> bigint', () => gen.nextId());
const stringId = bench('snowflake -> string', () => gen.nextIdString());

// --- B. 分布式锁（无竞争） ---
const backend = new MemoryLockBackend();
const lock = new DistributedLock('bench', backend, { autoRenew: false });
const samples2 = [];
const n = Math.min(args.iterations, 5000);
for (let i = 0; i < 500; i++) {
  const h = await lock.tryAcquire();
  await h.release();
}
for (let i = 0; i < n; i++) {
  const t = process.hrtime.bigint();
  const h = await lock.tryAcquire();
  await h.release();
  samples2.push(Number(process.hrtime.bigint() - t) / 1e6);
}
samples2.sort((a, b) => a - b);
const lockRoundTrip = {
  name: 'lock acquire + release',
  meanUs: round((samples2.reduce((a, b) => a + b, 0) / samples2.length) * 1000),
  opsPerSec: round(1000 / (samples2.reduce((a, b) => a + b, 0) / samples2.length)),
  p95Us: round(samples2[Math.floor(samples2.length * 0.95)] * 1000),
};

// --- C. 事件总线 ---
const bus = new EventBus();
bus.subscribe('e', () => {});
bus.subscribe('e', () => {});
const publish2 = await (async () => {
  const s2 = [];