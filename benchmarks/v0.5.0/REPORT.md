# v0.5.0 Benchmark 报告 —— 数据访问与缓存

生成时间：见 `results.json`（`--iterations=800`）。

## A. ORM（内存数据源）

| 操作 | 平均 | 吞吐 | p95 |
| --- | --- | --- | --- |
| insert | ~0.005 ms | 210,719 ops/sec | 0.01 ms |
| findById | 0.07 ms | 13,346 ops/sec | 0.24 ms |
| query（where + order + limit） | 0.22 ms | 4,599 ops/sec | 0.40 ms |
| paginate | 0.08 ms | 12,295 ops/sec | 0.22 ms |
| transaction（提交） | 0.06 ms | 15,970 ops/sec | 0.09 ms |

**怎么读**：内存数据源下 ORM 的额外开销在 **0.01~0.2ms** 量级。
对比 v0.2.0 测得的整条 HTTP 链路（约 0.5ms 级），ORM 不是瓶颈；