# nofault v0.2.0 运行说明

环境、安装、构建、Lint 与 v0.1.0 相同，见 [`docs/v0.1.0/RUNNING.md`](../v0.1.0/RUNNING.md)。
这里只写 v0.2.0 新增的部分。

## 跑测试

```bash
pnpm test                                   # 全部（67 项）
pnpm vitest run packages/rest               # 只跑 @nofault/rest 单测
pnpm vitest run tests/integration/v0.2.0    # 只跑 v0.2.0 集成测试（真实起服务发请求）
```

## 跑示例

```bash
pnpm example v0.2.0-rest-user-api
pnpm example v0.2.0-rest-user-api PORT=3222
```

启动后会打印注册的全部路由：

```
GET    /api/users
POST   /api/users
POST   /api/users/echo
GET    /api/users/count