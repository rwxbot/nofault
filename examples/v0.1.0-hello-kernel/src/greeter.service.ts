import { Injectable, type OnApplicationBootstrap, type OnModuleDestroy } from '@nofault/core';
import { ConfigService } from '@nofault/config';
import { createLogger, type Logger } from '@nofault/logger';

/**
 * 一个普通业务服务。
 *
 * 演示三件事：
 * 1. `@Injectable()` 声明可被容器管理
 * 2. 构造函数按类型注入 `ConfigService`（依赖 `design:paramtypes` 元数据）