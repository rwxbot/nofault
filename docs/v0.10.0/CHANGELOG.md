# Changelog — v0.10.0（2025 · 工程化工具链）

> 文档由契约生成，而不是手写 —— 手写必然漂移，而漂移的文档比没有文档更糟。

## 新增能力

### `nofaultctl openapi`
- 由同一份契约产出 OpenAPI 3.0 文档（纯函数 `openApiDocument()`）
- `:id` → `{id}`；`@Path` → `in: path`；`@Query` → `in: query`
- 无必填字段时**省略** `required` 键（空数组语义相反）
- 无响应类型用 204；所有操作都带上 422

### `nofaultctl dev`