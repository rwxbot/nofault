/**
 * SSE（Server-Sent Events）端到端测试。
 *
 * 验证三件事：线格式正确（event + data + 空行）、content-type 正确、
 * `close()` 之后响应真正结束（fetch 的 text() 能拿到完整 body）。
 */
import { describe, expect, it } from 'vitest';
import { Module } from '@nofault/core';