# nofault v0.8.0 运行说明

其余与 v0.1.0 相同，见 [`docs/v0.1.0/RUNNING.md`](../v0.1.0/RUNNING.md)。

## 跑测试

```bash
pnpm test                                    # 全部（324 项）
pnpm vitest run packages/telemetry           # Span / 采样 / 三种指标 / Prometheus 导出