# nofault v0.4.0 运行说明

环境、安装、构建、Lint 与 v0.1.0 相同，见 [`docs/v0.1.0/RUNNING.md`](../v0.1.0/RUNNING.md)。
这里只写 v0.4.0 新增的部分。

## 跑测试

```bash
pnpm test                                       # 全部（238 项）
pnpm vitest run packages/parser                 # 两种契约的解析 + 错误定位
pnpm vitest run packages/codegen                # 模板引擎 / 校验 / 生成 / 写盘策略
pnpm vitest run packages/cli                    # 参数解析 / 脚手架 / 各命令
pnpm vitest run tests/integration/v0.4.0        # 端到端：生成 → tsc 编译 → 真的起服务
```

集成测试会：
1. 把生成的工程写到仓库内 `.tmp/`（vitest 才能转译它）
2. 用仓库里的 `tsc` **真的编译一遍**生成物
3. `import` 生成的 module、起服务、打真实 HTTP 请求