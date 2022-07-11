#!/usr/bin/env node
/**
 * v0.7.0 Benchmark —— 治理原语的成本
 *
 * 治理必须是**便宜**的：限流/熔断每天要跑几十亿次，
 * 如果一次判定要几十微秒，它自己就成了瓶颈。
 *
 * 用法：node bench.mjs [--iterations=50000] [--report]
 */
import { writeFileSync } from 'node:fs';