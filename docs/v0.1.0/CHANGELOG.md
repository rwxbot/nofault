# Changelog — v0.1.0（2016 · 内核雏形）

首个版本。目标：**让声明式的类被框架托管起来，并能对外提供 HTTP 服务。**

## 新增

### @nofault/core
- **IoC 容器**
  - `NofaultContainer`：模块与 Provider 注册表，bootstrap 后 `lock()` 防止再注册
  - `Injector`：构造函数注入、属性注入、`@Optional()` 可选依赖、循环依赖检测
  - `InstanceWrapper`：作用域（SINGLETON / TRANSIENT / REQUEST）+ 单例缓存 + 并发去重
  - `ModuleRef`：`providers` / `imports` / `exports` 可见性规则
  - 五种 Provider 形态：`useValue` / `useClass` / `useFactory` / `useExisting` / 类简写
- **模块系统**
  - `@Module()`、`@Global()`、动态模块（`forRoot()` 模式）
  - `ModuleScanner`：DFS 遍历模块图，支持同步与异步动态模块