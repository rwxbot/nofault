/**
 * v0.9.0 端到端：把 ORM + 治理 + micro 原语装配成一个真服务，跑真实 HTTP。
 *
 * 验证的都是"只有分布式/并发环境才会暴露"的点：
 * 1. 启动顺序：探针在一切都就位之前必须回答"不能服务"
 * 2. 并发结算同一笔订单只能成功一次（分布式锁真的互斥）
 * 3. ID 超出 MAX_SAFE_INTEGER 且能反解出机器号（多实例可分）
 * 4. 事件订阅者与业务解耦（加消费者不用改业务逻辑）
 */
import { afterAll, describe, expect, it } from 'vitest';
import 'reflect-metadata';
import { Injectable, Module } from '@nofault/core';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  RestApplication,
  HttpException,
  bodyParser,
} from '@nofault/rest';
import {
  Column,
  Entity,
  MemoryDataSource,
  Migrator,