# v0.10.0 Benchmark 报告 —— 工具链该有多快

生成时间：见 `results.json`（`--iterations=200`）。

## 结果

| 步骤 | 耗时 | 吞吐 |
| --- | --- | --- |
| 解析契约 | 0.34 ms | 2,953 ops/sec |
| 生成 OpenAPI | 0.06 ms | 17,449 ops/sec |
| 序列化成 JSON | 0.10 ms | 10,356 ops/sec |
| doctor 环境自检 | 0.38 ms | 2,630 ops/sec |