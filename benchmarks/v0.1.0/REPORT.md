# Benchmark Report — v0.1.0

> 目标：量化「框架抽象」相对「裸 `node:http`」的开销，确认内核没有引入隐性成本。

## 方法

- **被测对象 A（基线）**：纯 `node:http` 服务，手写 URL 解析 + `res.writeHead` + `res.end`
- **被测对象 B**：nofault v0.1.0 示例 `hello-kernel`（IoC 容器 + 模块系统 + 配置 + 适配器）
- **接口**：`GET /hello?name=world`，两者返回**完全相同的 JSON**
- **压测器**：自研零依赖脚本（`benchmarks/v0.1.0/bench.mjs`）
  - keep-alive 连接池，固定并发数
  - 每轮：warmup → 固定时长采样
  - **多轮交替**，取 RPS 中位数轮次，规避冷启动偏差
