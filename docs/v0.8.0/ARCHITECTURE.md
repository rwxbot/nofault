# v0.8.0 架构：可观测性

## 一句话

**Metrics 告诉你"出问题了"，Trace 告诉你"是哪一步出的问题"，日志告诉你"当时发生了什么"**——
三者各管一段，缺一个排查就要靠猜。

v0.3.0 只做了 traceId **透传**（日志能串起来）；
这一版补上 **Span 上报**（时长、属性、状态、采样）与 **Metrics**（Counter / Gauge / Histogram）。

## 一、Trace：Span 树

一次请求 = 一棵 Span 树：

```
GET /api/users/:id                    ← 服务端 Span
├── repository.findById               ← 子 Span
└── rpc call user-service.profile     ← 子 Span（跨进程，靠 traceId 续上）
```

**父子关系靠"当前活动的 Span"建立**，而不是靠显式传参：

- 起 Span 时，从请求上下文里取出当前 Span 作为父，并把自己登记为新的当前 Span
- 结束时**还原**上一个（Span 是嵌套的，不还原就会挂错父）

这个"当前"必须放在**请求上下文**里（v0.3.0 的 `AsyncLocalStorage`）——
用模块级变量在并发下必然串号。
