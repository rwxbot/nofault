/**
 * v0.4.0 端到端：契约 → 生成 → 编译 → 真的跑起来。
 *
 * 前三步各自都能单测覆盖，但只有把它们串起来才回答了真问题：
 * **生成出来的代码能不能编译、能不能被框架加载、路由有没有真的注册上。**
 * 这三件事中任何一件挂了，整个代码生成能力就是零。
 */

import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import 'reflect-metadata';
import { execFileSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { generateApi } from '@nofault/cli';
import { bodyParser } from '@nofault/rest';
import { RestApplication } from '@nofault/rest';

const ROOT = resolve(__dirname, '../../..');

// 生成的工程必须落在仓库内，vitest/vite 才会顺便帮它转译（后面要真的 import 起来）
//
// 用 mkdtempSync 而不是手拼 Date.now()：名字唯一且创建即存在，避免并发/重跑时撞车。
// 清理时**只删自己这一个目录**（见 afterAll）—— 早期版本删的是整个 `.tmp`，
// 一旦某次运行残留，`.tmp` 会不断累积，最终一次递归删除几百个文件，
// 触发沙箱的批量删除护栏（SAFE_DELETE_BULK_CONFIRM_REQUIRED）导致用例加载失败。
mkdirSync(join(ROOT, '.tmp'), { recursive: true });
const PROJECT = mkdtempSync(join(ROOT, '.tmp', 'v0.4.0-it-'));

const API_CONTRACT = `
syntax = "v1"

type GreetReq {
  Name  string \`json:"name"\`
  Count int    \`json:"count,optional"\`
}

type GreetResp {
  Text string \`json:"text"\`
}

type GetUserReq {
  Id int \`path:"id"\`
}

type UserResp {
  Id   int    \`json:"id"\`
  Name string \`json:"name"\`
}

@server (
  group:  user
  prefix: /api
)
service user-api {
  @handler ping
  get /ping returns (GreetResp)

  @handler greet
  post /greet (GreetReq) returns (GreetResp)

  @handler getUser
  get /users/:id (GetUserReq) returns (UserResp)
}
`;
