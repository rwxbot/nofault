/**
 * nofaultctl —— 命令行入口。
 *
 * 子命令刻意保持很少：脚手架、生成、校验、看路由。
 * CLI 的价值在于**少而准**，不是一个什么都塞的瑞士军刀。
 */

import { resolve } from 'node:path';
import { writeFileSync } from 'node:fs';
import { parseArgs, booleanOption, stringOption, type ParsedArgs } from './argv';
import { log } from './log';
import { scaffold } from './commands/new';
import { compileContract, generateApi, generateFromSpec } from './commands/generate';
import { writeFiles, openApiDocument, type OpenApiOptions } from '@nofault/codegen';
import { validateSpec } from '@nofault/codegen';
import { DevRunner } from './commands/dev';
import { doctor } from './commands/doctor';
import { scaffoldMcp } from './commands/mcp-new';

export const VERSION = '0.10.0';

const HELP = `
${log.bold('nofaultctl')} ${VERSION} — nofault 工程脚手架与代码生成

用法:
  nofaultctl <command> [args] [options]

命令:
  new <project>              新建工程（含示例契约，并立刻生成一遍代码）
  mcp new <project>          新建 MCP 服务器工程（stdio，JSON-RPC）
  generate api <contract>    由契约生成 controller / service / module / dto
  validate <contract>        只做契约校验，不生成
  routes <contract>          列出契约里的全部路由
  openapi <contract>         由契约生成 OpenAPI 3.0 文档
  dev                        监听源码变化并自动重启
  doctor                     检查环境（Node / tsconfig / 依赖）

选项:
  --out <dir>                输出目录，默认 src
  --templates <dir>          模板覆盖目录（放 dto.tpl / controller.tpl 等）