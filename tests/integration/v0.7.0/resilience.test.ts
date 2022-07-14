/**
 * v0.7.0 端到端：治理能力真的接在 HTTP 链路上。
 *
 * 单测能证明算法对，但证明不了"位置对不对"：
 * 限流是不是在最外层、熔断打开时是不是真的没打下游——
 * 这些只有跑起来才知道。
 */
import { afterAll, describe, expect, it } from 'vitest';
import 'reflect-metadata';
import { Module } from '@nofault/core';
import { Controller, Get, RestApplication, type Middleware } from '@nofault/rest';
import { KeyedRateLimiter, CircuitBreaker, CircuitOpenError, rateLimit } from '@nofault/resilience';
