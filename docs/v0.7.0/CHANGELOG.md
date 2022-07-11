# Changelog — v0.7.0（2022 · 服务治理）

> 限流挡流量、熔断别再打坏掉的下游、舱壁限制并发、退避把重试打散。

## 新增包 `@nofault/resilience`

- **限流**：`TokenBucket`（匀速补充，无窗口尖峰）+ `KeyedRateLimiter`（按 IP/用户/租户）