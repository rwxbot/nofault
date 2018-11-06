# nofault v0.3.0 运行说明

环境、安装、构建、Lint 与 v0.1.0 相同，见 [`docs/v0.1.0/RUNNING.md`](../v0.1.0/RUNNING.md)。
这里只写 v0.3.0 新增的部分。

## 跑测试

```bash
pnpm test                                    # 全部（124 项）
pnpm vitest run packages/context             # 请求上下文
pnpm vitest run packages/core/test/request-scope.test.ts   # REQUEST 作用域与 captive dependency
pnpm vitest run tests/integration/v0.3.0     # v0.3.0 集成测试（真实起服务）
```

## 跑示例

```bash
pnpm example v0.3.0-runtime-basics
pnpm example v0.3.0-runtime-basics PORT=3333
```

启动后会打印路由，并默认开启 `/healthz` 与 `/readyz`。

### curl 试一遍

```bash
# 请求上下文 + REQUEST 作用域（注意 requestId 与 scopeRequestId 一致）
curl -s http://127.0.0.1:3000/api/runtime/context
# 多打几次，scopeInstanceNo 会递增 —— 每请求一份实例

# 配置（改 config/app.yaml 后立即生效，无需重启）