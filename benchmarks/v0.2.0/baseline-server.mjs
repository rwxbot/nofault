#!/usr/bin/env node
/**
 * 基线服务：纯 `node:http`，手写等效逻辑，无任何框架。
 *
 * 独立进程运行，避免与压测器争抢 CPU。
 */
import { createServer } from 'node:http';

const users = new Map([
  [1, { id: 1, name: 'Ada Lovelace', email: 'ada@nofault.dev', age: 36 }],
  [2, { id: 2, name: 'Alan Turing', email: 'alan@nofault.dev', age: 41 }],
]);

function send(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, { 'content-type': 'application/json', 'content-length': Buffer.byteLength(body) });
  res.end(body);
}

const server = createServer(async (req, res) => {