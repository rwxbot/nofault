/**
 * `ctx.route` 与认证的端到端。
 *
 * 之前鉴权中间件拿不到"当前调的是哪个 handler"，只能靠调用方维护
 * path -> handler 的映射——必然漂移。现在 `ctx.route` 由框架填充，
 * `authMiddleware` 直接读它，公开路由（@Public）不再被一起 401。
 */
import { afterAll, describe, expect, it } from 'vitest';
import 'reflect-metadata';
import { Injectable, Module } from '@nofault/core';
import { Body, Controller, Get, HttpException, Post, RestApplication, bodyParser } from '@nofault/rest';
import { Jwt, Public, Roles, authMiddleware, hashPassword, verifyPassword } from '@nofault/security';

const jwt = new Jwt('route-ref-secret-value-1234', { issuer: 'it', audience: 'api' });

interface Account {
  id: string;
  roles: string[];
  passwordHash: string;
}
const accounts = new Map<string, Account>();

@Injectable()
class AuthService {
  constructor() {
    void (async () => {
      accounts.set('alice', {
        id: 'u1',
        roles: ['admin'],
        passwordHash: await hashPassword('right-passphrase'),
      });
      accounts.set('bob', {
        id: 'u2',
        roles: ['viewer'],
        passwordHash: await hashPassword('bob-passphrase'),
      });
    })();
  }

  async login(name: string, password: string): Promise<{ token: string }> {
    const account = accounts.get(name);
    if (!account || !(await verifyPassword(password, account.passwordHash))) {
      throw new HttpException(401, 'invalid credentials', 401);
    }
    return { token: jwt.sign({ sub: account.id, roles: account.roles }, 3600) };
  }
}

@Controller('/admin')
class AdminController {
  constructor(private readonly service: AuthService) {}

  @Public()
  @Get('/health')
  health(): { ok: true } {
    return { ok: true };