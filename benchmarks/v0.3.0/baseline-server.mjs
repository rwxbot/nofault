#!/usr/bin/env node
/**
 * 基线服务：纯 node:http，手写等效逻辑，无框架。
 * 独立进程运行，避免与压测器抢 CPU。
 */
import { createServer } from 'node:http';

const config = {
  tenant: 'acme',
  betaEnabled: false,
  greeting: 'Hello from v0.3.0',