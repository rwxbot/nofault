# Changelog — v0.8.0（2023 · 可观测性）

> Metrics 说"出问题了"，Trace 说"是哪一步"，日志说"当时发生了什么"。

## 新增包 `@nofault/telemetry`

- **Trace**：`Tracer` / `Span`（属性、状态、时长）、`InMemoryExporter`、
  采样器 `alwaysSample` / `neverSample` / `ratioSampler`
  - 父子关系靠**请求上下文里的活动 Span** 建立，结束时自动还原
  - **不采样时 `startSpan()` 返回 `null`**，不为丢弃的链路付一分钱
  - 批量缓冲 + `flush()`；只有结束的 Span 才导出
- **Metrics**：`MetricRegistry` + `Counter` / `Gauge` / `Histogram`
  - Prometheus 文本导出（桶为累积计数，与官方语义一致）
  - `Histogram.percentile()` 返回**所在桶的上界**（与 `histogram_quantile` 同思路）
- **HTTP 接入** `observability()`：每请求一个服务端 Span + `x-trace-id` 响应头 +
  `http_requests_total` / `http_request_duration_ms` / `http_request_errors_total`

## 关键设计决策

| 决策 | 理由 |
| --- | --- |
| 采样在创建时决定 | 先建再丢 = 为丢弃的链路全额付费（5.84µs/条） |
| 不采样返回 `null` | 保证不采样时**真的**零开销（0.27µs） |
| 活动 Span 放请求上下文 | 模块级变量在并发下必然串号 |
| Span 结束时还原上一个 | Span 是嵌套的，不还原就挂错父 |