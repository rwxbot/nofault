# Changelog — v0.2.0（2017 · HTTP 全栈）

把 v0.1.0 的手写 `switch` 路由，升级为声明式的 Web 框架。

## 新增

### @nofault/rest（新包）
- **路由**
  - `RouteTree`：Radix 压缩前缀树，静态段前缀压缩 + 静态/参数/通配分槽
  - `RouteTable`：**每个 HTTP method 一棵树**（Radix 树实现），HEAD 自动回落 GET
  - 匹配优先级：静态 > 参数 > 通配
  - 注册期冲突检测，重复路径 / 同层不同参数名直接抛 `RouteConflictError`
  - `allowedMethods()` 支撑 405 + `Allow` 响应头
- **装饰器**
  - `@Controller(path | { path, middleware })`
  - `@Get` `@Post` `@Put` `@Delete` `@Patch` `@Head` `@Options` `@All` `@HttpCode`