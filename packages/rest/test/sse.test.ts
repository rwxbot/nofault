/**
 * SSE（Server-Sent Events）端到端测试。
 *
 * 验证三件事：线格式正确（event + data + 空行）、content-type 正确、
 * `close()` 之后响应真正结束（fetch 的 text() 能拿到完整 body）。
 */
import { describe, expect, it } from 'vitest';
import { Module } from '@nofault/core';
import { RestApplication, openSse } from '../src/index';

@Module({ controllers: [] })
class SseModule {}

describe('sse', () => {
  it('streams server-sent events and ends the response on close', async () => {
    const app = await RestApplication.create(SseModule, { quiet: true });