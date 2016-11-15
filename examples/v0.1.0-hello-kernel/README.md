# 示例：v0.1.0 hello-kernel

最小可运行示例，演示 v0.1.0 的四个能力：**IoC 容器 / 模块系统 / 配置 / 最小 HTTP 服务**。

## 跑起来

```bash
# 在 nofault/ 根目录
pnpm install
pnpm example v0.1.0-hello-kernel

# 或指定端口
pnpm example v0.1.0-hello-kernel PORT=3111