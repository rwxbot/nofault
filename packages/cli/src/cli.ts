/**
 * nofaultctl —— 命令行入口。
 *
 * 子命令刻意保持很少：脚手架、生成、校验、看路由。
 * CLI 的价值在于**少而准**，不是一个什么都塞的瑞士军刀。
 */

import { resolve } from 'node:path';
import { writeFileSync } from 'node:fs';
import { parseArgs, booleanOption, stringOption, type ParsedArgs } from './argv';