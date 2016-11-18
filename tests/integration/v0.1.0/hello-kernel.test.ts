import 'reflect-metadata';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createHttpApplication } from '@nofault/http';
import type { NofaultApplication } from '@nofault/core';
import { AppModule } from '../../../examples/v0.1.0-hello-kernel/src/app.module';
import { GreeterService } from '../../../examples/v0.1.0-hello-kernel/src/greeter.service';
import { createRouter } from '../../../examples/v0.1.0-hello-kernel/src/router';

/**
 * 集成测试：真实起服务 + 真实发请求。
 *
 * 这是 v0.1.0 DoD 的硬性要求——示例必须"跑得起来"，而不是只有编译通过。
 */
describe('v0.1.0 hello-kernel (integration)', () => {