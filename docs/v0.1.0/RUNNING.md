# nofault v0.1.0 运行说明

## 环境要求

- Node.js **≥ 20**（开发用 v22.22.2）
- pnpm **≥ 9**（开发用 v12.3.4）

## 一键安装

```bash
cd nofault-all/nofault
pnpm install
```

## 构建

```bash
pnpm build
# 等价：node scripts/build-packages.mjs
# 会按依赖拓扑顺序构建：core → config → http → logger
```