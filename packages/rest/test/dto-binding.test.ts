/**
 * v0.4.0 补的两处：
 * 1. query DTO 也要校验（原先只校验 body）
 * 2. query string 里的值要按 DTO 属性声明类型强制转换（否则 `number` 字段永远是字符串）
 *
 * 这两个洞都是**生成器开始产出 `@Query() dto` 之后才暴露出来的**：
 * 人类手写时通常会写 `@Query('page') page: number` 逐个取，框架本来就会强制；
 * 一旦整对象绑定，类型转换的责任就没人担了。
 */
import { describe, expect, it } from 'vitest';
import { validateDto, coerceDtoFields } from '../src/validation';
import { IsInt, IsOptional, IsString, Min } from '../src/validation';

class PageReq {
  @IsInt() @Min(1)
  page!: number;
