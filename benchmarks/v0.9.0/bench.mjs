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
