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
