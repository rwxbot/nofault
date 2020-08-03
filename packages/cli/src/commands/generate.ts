/**
 * `nofaultctl generate api <contract>` —— 契约 → 代码。
 *
 * 链路：`parser → Spec → validate → generate → write`
 *
 * 顺序有讲究：**先校验再生成**。
 * 校验失败时一个文件都不写，否则用户会拿到半套代码，
 * 编译错报指向生成物，而真正要改的是契约。
 */