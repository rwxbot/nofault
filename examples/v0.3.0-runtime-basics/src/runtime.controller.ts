import { Controller, Ctx, Get, Post, RestContext } from '@nofault/rest';
import { Injectable } from '@nofault/core';
import { currentContext } from '@nofault/context';
import { ConfigService } from '@nofault/config';
import { RequestScopeService } from './request-scope.service';

/**
 * 运行时能力演示控制器。
 *
 * 四个端点分别对应 v0.3.0 的四个能力：
 * - `/api/runtime/context`  请求上下文 + REQUEST 作用域
 * - `/api/runtime/config`   配置热更新
 * - `/api/runtime/trace`    traceparent 传播
 * - `/api/runtime/notes`    同一请求内共享实例
 */