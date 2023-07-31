# Changelog — v0.8.0（2023 · 可观测性）

> Metrics 说"出问题了"，Trace 说"是哪一步"，日志说"当时发生了什么"。

## 新增包 `@nofault/telemetry`

- **Trace**：`Tracer` / `Span`（属性、状态、时长）、`InMemoryExporter`、
  采样器 `alwaysSample` / `neverSample` / `ratioSampler`
  - 父子关系靠**请求上下文里的活动 Span** 建立，结束时自动还原