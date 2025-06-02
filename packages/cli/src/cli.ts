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