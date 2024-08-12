# v0.9.0 Benchmark 报告 —— 分布式原语的成本

生成时间：见 `results.json`（`--iterations=20000`）。

## 结果

| 操作 | 单次开销 | 吞吐 | p95 |
| --- | --- | --- | --- |
| Snowflake → bigint | 0.61 µs | 1,648,381 ops/sec | 0.72 µs |
| Snowflake → string | 0.55 µs | 1,817,492 ops/sec | 0.56 µs |
| 加锁 + 释放（无竞争） | 3.70 µs | 270,029 ops/sec | 5.86 µs |