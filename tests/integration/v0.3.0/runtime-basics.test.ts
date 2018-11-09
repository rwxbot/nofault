import 'reflect-metadata';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Module } from '@nofault/core';
import { ConfigModule } from '@nofault/config';
import { RestApplication, bodyParser, requestContext } from '@nofault/rest';
import { RuntimeController } from '../../../examples/v0.3.0-runtime-basics/src/runtime.controller';
import { RequestScopeService } from '../../../examples/v0.3.0-runtime-basics/src/request-scope.service';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// 配置文件必须在**模块加载期**就定好：
// `@Module({ imports: [ConfigModule.forRootAsync(...)] })` 的装饰器在 import 时就求值了，
// 放到 beforeAll 里再创建文件已经来不及。
const configDir = mkdtempSync(join(tmpdir(), 'nofault-v030-'));
const configFile = join(configDir, 'app.yaml');
writeFileSync(
  configFile,
  'app:\n  name: runtime-basics\n  tenant: acme\nfeature:\n  betaEnabled: false\n  greeting: Hello from v0.3.0\n',
  'utf8',
);

@Module({
  imports: [ConfigModule.forRootAsync({ path: configFile, watch: true })],
  controllers: [RuntimeController],
  providers: [RequestScopeService],
})
class TestAppModule {}