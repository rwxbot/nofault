# v1.0.0 Benchmark 报告 —— 安全原语的成本

生成时间：见 `results.json`（`--iterations=2000`，密码哈希只跑 30 次）。

## 结果

| 操作 | 单次开销 | 吞吐 |
| --- | --- | --- |
| JWT 签发 | 0.02 ms | 54,666 ops/sec |
| JWT 验签 | 0.02 ms | 56,105 ops/sec |
| scrypt 哈希（N=2048） | 45.78 ms | 21.8 ops/sec |
| scrypt 校验 | 45.32 ms | 22.1 ops/sec |

## 这两个数字看起来矛盾，其实都对