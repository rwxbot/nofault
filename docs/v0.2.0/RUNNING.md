# nofault v0.2.0 运行说明

环境、安装、构建、Lint 与 v0.1.0 相同，见 [`docs/v0.1.0/RUNNING.md`](../v0.1.0/RUNNING.md)。
这里只写 v0.2.0 新增的部分。

## 跑测试

```bash
pnpm test                                   # 全部（67 项）
pnpm vitest run packages/rest               # 只跑 @nofault/rest 单测
pnpm vitest run tests/integration/v0.2.0    # 只跑 v0.2.0 集成测试（真实起服务发请求）
```

## 跑示例

```bash
pnpm example v0.2.0-rest-user-api
pnpm example v0.2.0-rest-user-api PORT=3222
```

启动后会打印注册的全部路由：

```
GET    /api/users
POST   /api/users
POST   /api/users/echo
GET    /api/users/count
GET    /api/users/:id
PUT    /api/users/:id
PATCH  /api/users/:id
DELETE /api/users/:id
GET    /api/users/probe/missing
```

### curl 试一遍

```bash
# 列表（统一响应包装）
curl http://127.0.0.1:3000/api/users
# {"code":0,"data":[{"id":1,"name":"Ada Lovelace",...}],"message":"ok"}

# 带 query
curl "http://127.0.0.1:3000/api/users?keyword=Ada"

# 路径参数
curl http://127.0.0.1:3000/api/users/1

# 创建（校验通过）
curl -X POST http://127.0.0.1:3000/api/users \
  -H 'content-type: application/json' \
  -d '{"name":"Grace","email":"grace@nofault.dev","age":45}'

# 创建（校验失败 → 422，含字段级明细）
curl -i -X POST http://127.0.0.1:3000/api/users \
  -H 'content-type: application/json' \
  -d '{"name":"X","email":"bad","age":999}'

# 邮箱重复 → 409
curl -X POST http://127.0.0.1:3000/api/users \
  -H 'content-type: application/json' \
  -d '{"name":"Ada Two","email":"ada@nofault.dev","age":20}'

# 更新 / 部分更新
curl -X PUT   http://127.0.0.1:3000/api/users/2 -H 'content-type: application/json' -d '{"name":"Alan"}'
curl -X PATCH http://127.0.0.1:3000/api/users/2 -H 'content-type: application/json' -d '{"name":"A"}'

# 删除 → 204
curl -i -X DELETE http://127.0.0.1:3000/api/users/2

# 不存在 → 404
curl -i http://127.0.0.1:3000/api/users/999

# 方法不允许 → 405 + Allow 头
curl -i -X POST http://127.0.0.1:3000/api/users/count

# 路径参数类型错误 → 400
curl -i -X DELETE http://127.0.0.1:3000/api/users/abc

# 响应头（CORS / 安全头 / 耗时）
curl -i http://127.0.0.1:3000/api/users | head -20
```