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
  exports: [GreeterService],
})
export class AppModule {}
```

`ConfigModule.forRoot()` 默认注册为**全局模块**，所以任何模块的服务都能直接注入 `ConfigService`。

## 3. 启动应用

```ts
import 'reflect-metadata';                       // 必须最先 import
import { createHttpApplication } from '@nofault/http';
import { AppModule } from './app.module';
import { GreeterService } from './greeter.service';

const app = await createHttpApplication(AppModule, { name: 'demo' });
const greeter = await app.get(GreeterService);

app.use((req, res) => {
  res.statusCode = 200;
  res.end(greeter.greet('world'));
  return true;      // 返回 true = 请求已处理，终止 handler 链
});

app.enableShutdownHooks();     // SIGTERM / SIGINT 优雅退出
await app.listen(3000);
```

## 4. Provider 的五种写法

```ts
@Module({
  providers: [
    UserService,                                        // ① 类简写
    { provide: 'API_URL', useValue: 'https://x.dev' },   // ② 值
    { provide: 'CACHE', useClass: RedisCache },          // ③ 类替换
    {
      provide: 'POOL',
      useFactory: (cfg: ConfigService) => createPool(cfg.get<number>('db.pool', 10)),
      inject: [ConfigService],
    },                                                   // ④ 工厂
    { provide: 'LEGACY_CACHE', useExisting: 'CACHE' },   // ⑤ 别名
  ],
})
export class SomeModule {}
```

## 5. 注入方式

```ts
@Injectable()
export class Demo {
  constructor(
    private readonly repo: UserRepo,              // 按类型
    @Inject('API_URL') private readonly url: string,  // 按令牌
    @Optional() private readonly tracer?: Tracer,     // 可选，缺失注入 undefined
  ) {}

  @Inject(Logger) private readonly logger!: Logger;   // 属性注入
}
```

## 6. 作用域

```ts
@Injectable({ scope: Scope.SINGLETON })  // 默认：全局一个实例
@Injectable({ scope: Scope.TRANSIENT })  // 每次解析都新建
@Injectable({ scope: Scope.REQUEST })    // v0.3.0 启用
```

## 7. 全局模块