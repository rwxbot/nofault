# Changelog — v0.4.0（2019 · 代码生成 v1）

> 契约是唯一事实来源，代码是它的投影。

## 新增包

### `@nofault/dsl`
- `ApiSpec` / `TypeSpec` / `RouteSpec` / `FieldSpec`：两种输入共用的中间表示
- 契约装饰器：`@Api @Prefix @Group @Jwt @Middleware @Timeout @MaxBytes`、
  `@Get @Post @Put @Delete @Patch @Head @Options @Handler`、
  `@Body @Path @Query @Header @Form`、
  `@IsString @IsInt @IsNumber @IsEmail @IsNotEmpty @MinLength @MaxLength @Min @Max @Optional`
- 命名工具：pascal / camel / kebab / snake / singularize

### `@nofault/parser`
- 手写**扫描器 + 递归下降**（不引 ANTLR），约 500 行
- `parseApiSource()`：`.api` 文本 DSL
- `parseTsSource()`：TS 契约 `.api.ts`（**不执行用户代码**，只当文本扫）
- `parseContractFile()`：按扩展名自动识别格式
- 每个错误都带**行列号**，并能指出"哪个服务 / 哪条路由 / 哪个字段"
