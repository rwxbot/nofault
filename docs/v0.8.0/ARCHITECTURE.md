# v0.8.0 架构：可观测性

## 一句话

**Metrics 告诉你"出问题了"，Trace 告诉你"是哪一步出的问题"，日志告诉你"当时发生了什么"**——
三者各管一段，缺一个排查就要靠猜。

v0.3.0 只做了 traceId **透传**（日志能串起来）；
这一版补上 **Span 上报**（时长、属性、状态、采样）与 **Metrics**（Counter / Gauge / Histogram）。

## 一、Trace：Span 树

一次请求 = 一棵 Span 树：
