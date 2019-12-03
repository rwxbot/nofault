# v0.4.0 使用说明：nofaultctl 与 API 契约

## 安装

```bash
pnpm add -D @nofault/cli      # 或 npm i -D @nofault/cli
```

## 三个命令

```bash
npx nofaultctl new <project>                # 建工程（含示例契约并立刻生成一遍）
npx nofaultctl generate api <contract>      # 由契约生成代码
npx nofaultctl validate <contract>          # 只校验，不生成（可挂 CI）
npx nofaultctl routes <contract>            # 列出契约里的全部路由
```

常用选项：

| 选项 | 说明 |
| --- | --- |
| `--out <dir>` | 输出根目录，默认 `src` |
| `--root-module` | 额外生成根 `app.module.ts` |
| `--templates <dir>` | 模板覆盖目录 |
| `--force` | 契约有错也生成；覆盖时无视生成标记 |
| `--dry-run` | 只报告，不写盘 |

## 一、写契约（TypeScript 形态，主推）

```ts
// api/user.api.ts
import {
  Api, Prefix, Middleware,
  Get, Post, Delete, Handler,
  Body, Query, Path,
  IsString, IsInt, IsEmail, MinLength, MaxLength, Min, Max, Optional,
} from '@nofault/dsl';

export class CreateUserReq {
  @Body('name') @IsString() @MinLength(2) @MaxLength(32)
  name!: string;

  @Body('email') @IsString() @IsEmail()
  email!: string;

  @Body('age') @IsInt() @Min(0) @Max(150) @Optional()
  age?: number;
}

export class GetUserReq {
  @Path('id') @IsInt()
  id!: number;
}

@Api('user')