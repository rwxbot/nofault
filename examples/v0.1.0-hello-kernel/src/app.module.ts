import { Module } from '@nofault/core';
import { ConfigModule } from '@nofault/config';
import { resolve } from 'node:path';
import { GreeterService } from './greeter.service';

/**
 * 根模块。
 *
 * `ConfigModule.forRoot()` 返回动态模块并注册为全局模块，