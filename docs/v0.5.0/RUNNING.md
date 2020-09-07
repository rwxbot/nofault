# nofault v0.5.0 运行说明

其余与 v0.1.0 相同，见 [`docs/v0.1.0/RUNNING.md`](../v0.1.0/RUNNING.md)。

## 跑测试

```bash
pnpm test                                    # 全部（270 项）
pnpm vitest run packages/orm                 # 映射 / Repository / 事务 / 迁移
pnpm vitest run packages/cache               # TTL / LRU / 击穿 / 抖动
pnpm vitest run tests/integration/v0.5.0     # ORM + 缓存真的接进 HTTP 服务
```

## 跑示例

```bash
pnpm example v0.5.0-data-user-api
pnpm example v0.5.0-data-user-api PORT=3350
```
