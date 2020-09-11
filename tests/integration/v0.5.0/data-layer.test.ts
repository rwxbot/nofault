/**
 * v0.5.0 端到端：ORM + 缓存真的接进 HTTP 服务。
 *
 * 重点验证三件"跑单测看不出来"的事：
 * 1. Repository 能被容器解析（装饰器元数据 + 模块装配全链路）
 * 2. 事务回滚在 HTTP 请求里也生效（异常 → 500 → 数据干净）
 * 3. 缓存击穿保护在真实并发下只回源一次
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import 'reflect-metadata';
import { Module, Injectable, Inject } from '@nofault/core';
import {
  Column,
  Entity,
  MemoryDataSource,
  Migrator,
  OrmModule,
  PrimaryGeneratedColumn,
  Repository,
  InjectRepository,
} from '@nofault/orm';
import { CACHE, CacheModule, MemoryCache, type Cache } from '@nofault/cache';
import { Body, Controller, Get, Param, Post, RestApplication, bodyParser } from '@nofault/rest';

@Entity({ table: 'notes' })
class Note {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'title' })
  title!: string;
}

@Injectable()
class NoteService {
  constructor(