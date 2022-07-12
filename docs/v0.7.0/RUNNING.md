# nofault v0.7.0 运行说明

其余与 v0.1.0 相同，见 [`docs/v0.1.0/RUNNING.md`](../v0.1.0/RUNNING.md)。

## 跑测试

```bash
pnpm test                                        # 全部
pnpm vitest run packages/resilience              # 令牌桶 / 熔断 / 舱壁 / 退避