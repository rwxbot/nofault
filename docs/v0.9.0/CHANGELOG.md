# Changelog — v0.9.0（2024 · 微服务全家桶）

> 前八版交付的是能力，这一版负责把它们接起来，并补上分布式环境下不能省的四样东西。

## 新增包 `@nofault/micro`

- **Snowflake ID**：63 位（时间戳 / 数据中心 / 机器 / 序列号）
  - 时钟回拨：容忍范围内自旋等过去，超出则抛 `ClockMovedBackError`
  - 序列号耗尽时**等到下一毫秒**，不回绕
  - 返回 `bigint` / 字符串，不返回 `number`（63 位超过 MAX_SAFE_INTEGER）
- **分布式锁** `DistributedLock` + `MemoryLockBackend`（可换 Redis）
  - 释放时校验 token，绝不释放别人的锁
  - 自动续期 watchdog，续期失败即停
  - `run()` 用 finally 释放
- **调度器** `Scheduler`：5 段 cron（`*`/步长/区间/列表）+ `every` / `fixedDelay` / `after`
  - cron 的日与周是**或**关系（与 Unix cron 一致）
  - 默认不补跑、不允许重叠