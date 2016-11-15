# 示例：v0.1.0 hello-kernel

最小可运行示例，演示 v0.1.0 的四个能力：**IoC 容器 / 模块系统 / 配置 / 最小 HTTP 服务**。

## 跑起来

```bash
# 在 nofault/ 根目录
pnpm install
pnpm example v0.1.0-hello-kernel

# 或指定端口
pnpm example v0.1.0-hello-kernel PORT=3111
```

## 试一试

```bash
curl http://127.0.0.1:3000/
# nofault v0.1.0 hello-kernel. Try GET /hello?name=world or GET /health

curl "http://127.0.0.1:3000/hello?name=world"
# {"message":"Hello from nofault, world!","app":"hello-kernel"}

curl http://127.0.0.1:3000/health
# {"status":"ok","app":"hello-kernel","uptime":12}

curl -i http://127.0.0.1:3000/nope
# HTTP/1.1 404 Not Found
```

环境变量覆盖配置（12-factor）：

```bash
NOFAULT_APP__GREETING="Hi there" pnpm example v0.1.0-hello-kernel
curl http://127.0.0.1:3000/hello
# {"message":"Hi there!","app":"hello-kernel"}
```

## 文件说明

| 文件 | 作用 |
| --- | --- |
| `src/main.ts` | 入口：`createHttpApplication(AppModule)` → `app.use(router)` → `app.listen()` |
| `src/app.module.ts` | 根模块，导入 `ConfigModule.forRoot()` |
| `src/greeter.service.ts` | `@Injectable()` 服务，注入 `ConfigService`，实现生命周期钩子 |
| `src/router.ts` | 手写路由（v0.1.0 没有路由树，v0.2.0 会替换成 `@nofault/rest`） |
| `config/app.yaml` | 应用配置 |

## 这个示例证明了什么

1. **构造函数按类型注入**生效 —— `GreeterService` 没写 `@Inject`，靠 `design:paramtypes` 拿到 `ConfigService`