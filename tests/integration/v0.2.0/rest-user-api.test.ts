import 'reflect-metadata';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { RestApplication, cors, bodyParser } from '@nofault/rest';
import { AppModule } from '../../../examples/v0.2.0-rest-user-api/src/app.module';
import { UserService } from '../../../examples/v0.2.0-rest-user-api/src/users/user.service';
import { reset } from '../../../examples/v0.2.0-rest-user-api/src/users/user.model';

/**
 * v0.2.0 集成测试：真实起服务 + 真实发请求。
 *
 * 覆盖：路由匹配、路径参数、query、body 校验、异常过滤、
 * 统一响应包装、中间件（CORS）、404/405。
 */
describe('v0.2.0 rest-user-api (integration)', () => {
  let app: RestApplication;
  let base: string;

  beforeAll(async () => {
    reset();
    app = await RestApplication.create(AppModule, {
      name: 'rest-user-api-test',
      globalPrefix: '/api',
      middleware: [cors({ origin: true }), bodyParser()],
    });
    const { port } = await app.listen(0, '127.0.0.1');
    base = `http://127.0.0.1:${port}/api`;
    const users = await app.get(UserService);
    users.create({ name: 'Ada Lovelace', email: 'ada@nofault.dev', age: 36 });
  });

  afterAll(async () => {
    await app.close();
    reset();
  });

  it('registers decorator-declared routes with the global prefix', () => {
    const routes = app.getRoutes().map((r) => `${r.method} ${r.path}`).sort();
    expect(routes).toEqual([
      'DELETE /api/users/:id',
      'GET /api/users',
      'GET /api/users/:id',
      'GET /api/users/count',
      'GET /api/users/probe/missing',