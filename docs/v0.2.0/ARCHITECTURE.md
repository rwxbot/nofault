# nofault v0.2.0 架构说明（HTTP 全栈）

> 主题：**Radix 路由 + 装饰器控制器 + 洋葱中间件 + 参数绑定校验 + 统一异常过滤**
> 覆盖范围：`rest` 包 —— 路由引擎 / 中间件链 / HTTP 适配 / 路径参数
> 规范：**Node.js / NestJS 生态规范**

---

## 1. 这一版要解决的问题

v0.1.0 能起服务，但路由是手写 `switch`。v0.2.0 要把它变成**声明式**的：

```ts
@Controller('/users')
export class UserController {
  @Get('/:id')
  detail(@Param('id') id: number) { ... }
}
```

同时补齐 Web 框架该有的四件套：**中间件、参数绑定、校验、异常处理**。

---

## 2. 架构图

![nofault v0.2.0 架构图](./ARCHITECTURE.svg)

Mermaid 版：

```mermaid
graph TD
    subgraph BOOT["引导期（启动一次）"]
        E1[RouteExplorer 遍历 controllers]
        E2["读装饰器元数据"]
        E3["RouteTable（每 method 一棵 Radix 树）"]
        E1 --> E2 --> E3
    end
