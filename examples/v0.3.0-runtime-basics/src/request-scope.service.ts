import { Injectable, Scope } from '@nofault/core';
import { currentContext } from '@nofault/context';

let seq = 0;

/**
 * REQUEST 作用域的服务：**每个请求一份实例**。
 *
 * 这是 v0.1.0 就预留、v0.3.0 才真正启用的能力。
 * 典型用途：请求级缓存、租户上下文、审计追踪、UnitOfWork（一次请求一个事务）。
 */
@Injectable({ scope: Scope.REQUEST })