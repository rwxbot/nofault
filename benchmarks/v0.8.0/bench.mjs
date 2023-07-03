#!/usr/bin/env node
/**
 * v0.8.0 Benchmark —— 可观测性的成本
 *
 * 可观测性有个自相矛盾的要求：**它必须便宜到可以全量开启**。
 * 一旦因为"太贵"只开 1% 采样，出问题时你永远差那一份 trace。
 * 所以这里量的是"埋一次点要花多久"。
 *
 * 用法：node bench.mjs [--iterations=20000] [--report]
 */
import { writeFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '../..');
