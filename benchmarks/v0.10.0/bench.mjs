#!/usr/bin/env node
/**
 * v0.10.0 Benchmark —— 工具链该有多快
 *
 * 工具链的速度标准只有一条：**要快到能挂在保存钩子上**。
 * 一旦慢到需要"手动跑一下"，它就不再是被信任的那份文档了。
 *
 * 用法：node bench.mjs [--iterations=200] [--report]
 */
import { writeFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));