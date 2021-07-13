# Changelog — v0.6.0（2021 · RPC 框架）

> TCP 没有消息边界 → 自己分帧；一条连接上多个在途调用 → 每个请求要有 id。

## 新增包 `@nofault/rpc`

- **协议**：`[4 字节大端长度][JSON]`；`FrameReader` 处理半包/粘包，超长帧直接拒绝
- **服务端** `RpcServer`：`register()` / `registerService()`（读原型方法名，业务类零框架依赖）
- **客户端** `RpcClient`：连接池（按目标去重在建连接）、超时、重试（只重试可重试的）
- **注册发现** `InMemoryRegistry`：TTL 过期自动剔除 + `RoundRobinBalancer` 加权轮询
- **拦截器**：`composeInterceptors` / `loggingInterceptor` / `traceInterceptor`
- **HTTP 桥接** `rpcErrorToStatus()`：超时→504（不是笼统的 500）、业务码原样透出
- **DI** `RpcModule.forClient()` + `@InjectRpcClient()`

## 关键设计决策

| 决策 | 理由 |
| --- | --- |