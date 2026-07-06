# nofault v1.0.0 运行说明

其余与 v0.1.0 相同，见 [`docs/v0.1.0/RUNNING.md`](../v0.1.0/RUNNING.md)。

## 跑测试

```bash
pnpm test                                    # 全部（396 项）
pnpm vitest run packages/security            # JWT / 密码 / RBAC / 中间件
pnpm vitest run tests/integration/v1.0.0     # 真实 HTTP 上的 401 / 403 / 200
```

## 用起来

```ts
import { Jwt, Roles, Public, authMiddleware, SecurityModule } from '@nofault/security';

const jwt = new Jwt(process.env.JWT_SECRET!, { issuer: 'my-app', audience: 'api' });

// 登录：签发
const token = jwt.sign({ sub: user.id, roles: user.roles }, 3600);

// 校验（不抛错即有效）
const payload = jwt.verify(token);

// 控制器
class AdminController {
  @Public()
  @Get('/health')
  health() { return { ok: true }; }

  @Roles('admin')
  @Get('/wipe')
  wipe() { return { wiped: true }; }
}

// 挂中间件
RestApplication.create(AppModule, {
  middleware: [bodyParser(), authMiddleware({ jwt, handlerOf: () => currentHandler() })],
});
```

## 跑示例

```bash
pnpm example v1.0.0-security-demo
pnpm example v1.0.0-security-demo PORT=3400
```

一个带认证的最小服务：真实登录（scrypt 校验）、JWT 签发、角色授权、traceId 自动进日志。

```bash
# 公开路由（@Public）
curl -s http://127.0.0.1:3000/auth/health

# 登录（alice / correct-horse-battery）
TOKEN=$(curl -s -X POST http://127.0.0.1:3000/auth/login \
  -H 'content-type: application/json' \
  -d '{"name":"alice","password":"correct-horse-battery"}' \
  | python3 -c "import sys,json;print(json.load(sys.stdin)['data']['token'])")