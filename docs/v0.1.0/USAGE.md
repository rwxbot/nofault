# nofault v0.1.0 使用说明

## 1. 声明可注入的服务

```ts
import { Injectable, type OnApplicationBootstrap } from '@nofault/core';
import { ConfigService } from '@nofault/config';

@Injectable()
export class GreeterService implements OnApplicationBootstrap {
  private readonly greeting: string;

  // 按类型注入：依赖 TS 发射的 design:paramtypes 元数据
  constructor(private readonly config: ConfigService) {
    this.greeting = this.config.get<string>('app.greeting', 'Hello');
  }

  onApplicationBootstrap(): void {
    console.log('ready');
  }

  greet(name?: string): string {
    return name ? `${this.greeting}, ${name}!` : `${this.greeting}!`;
  }
}
```

## 2. 声明模块

```ts
import { Module } from '@nofault/core';
import { ConfigModule } from '@nofault/config';

@Module({
  imports: [ConfigModule.forRoot({ path: './config/app.yaml' })],
  providers: [GreeterService],