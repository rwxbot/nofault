# Changelog — v0.3.0（2018 · 运行时基座）

把"请求之内"该有的能力补齐：上下文、请求级作用域、热配置、可观测日志、探针。

## 新增

### @nofault/context（新包）
- `RequestContext`：请求 ID + W3C traceId/spanId + 数据袋，同时充当内核的 `contextId`
- `RequestContextStore`：`AsyncLocalStorage` 传播，支持 `run` / `current` / `require` / `contextId`
- W3C Trace Context：`parseTraceparent` / `formatTraceparent`（非法头返回 undefined 而非抛错）
- 顶层便捷 API：`currentContext` / `requireContext` / `currentContextId` / `runWithContext`
