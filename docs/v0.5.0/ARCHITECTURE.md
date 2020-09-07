# v0.5.0 架构：数据访问层

> 图见 [`ARCHITECTURE.svg`](./ARCHITECTURE.svg)

## 一句话

**方言只生成字符串，Repository 不碰 SQL，DataSource 是唯一的 IO 边界。**
于是 ORM 可以不装数据库就跑起来，也能接任何驱动。

## 一、分层

```
@Entity 装饰器 ──> EntityMeta（元数据）
                        │
Repository / QueryBuilder ──> Dialect ──> SQL 字符串 + 参数 ──> Executor（驱动）
        │
        └──> DataSource（IO 边界）
                 ├─ MemoryDataSource（内存表 + 迷你 SQL 引擎）
                 └─ SqlDataSource（executor 回调，不绑驱动）
```

两条纪律：

1. **Dialect 不做 IO** —— 所以 SQL 可以单测，换驱动只要换 executor