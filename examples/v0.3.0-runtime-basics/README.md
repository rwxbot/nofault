# 示例：v0.3.0 runtime-basics

演示 v0.3.0 的四个运行时能力：**请求上下文 + REQUEST 作用域 + 配置热更新 + traceId 日志 + 健康探针**。

## 跑起来

```bash
# 在 nofault/ 根目录
pnpm example v0.3.0-runtime-basics
pnpm example v0.3.0-runtime-basics PORT=3333
```

## 试一试

```bash
# 1) 请求上下文 + REQUEST 作用域
curl -s http://127.0.0.1:3000/api/runtime/context
# {"requestId":"req_f6516589","traceId":"afc5…","scopeInstanceNo":1,
#  "scopeRequestId":"req_f6516589","configReloadable":true}
#   ↑ requestId 与 scopeRequestId 一致；多打几次 scopeInstanceNo 会递增

# 2) 配置热更新（改 config/app.yaml 后无需重启）