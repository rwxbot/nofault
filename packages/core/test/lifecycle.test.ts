import { describe, expect, it } from 'vitest';
import 'reflect-metadata';
import {
  Injectable,
  Module,
  NofaultFactory,
  type BeforeApplicationShutdown,
  type OnApplicationBootstrap,
  type OnApplicationShutdown,
  type OnModuleDestroy,
  type OnModuleInit,
} from '../src/index';

describe('application lifecycle hooks', () => {
  it('calls hooks in the documented order', async () => {
    const calls: string[] = [];

    @Injectable()
    class Service
      implements