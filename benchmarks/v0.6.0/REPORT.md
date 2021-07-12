# v0.6.0 Benchmark 报告 —— RPC

生成时间：见 `results.json`（`--iterations=2000 --concurrency=50`，本机 socket）。

## 结果

| 场景 | 数值 |
| --- | --- |
| 串行调用（连接已就绪） | 0.16 ms / 6,134 ops/sec（p95 0.27 ms） |
| 每次新建客户端（含建连） | 0.50 ms |
| 池化收益 | 省 0.34 ms/次，约 **3.1×** |
| 50 并发 × 40 次 | 2,000 次共 63.3 ms，**31,590 ops/sec** |