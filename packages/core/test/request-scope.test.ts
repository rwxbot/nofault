import 'reflect-metadata';
import { describe, expect, it } from 'vitest';
import { Injectable, Module, Scope, NofaultFactory, MissingContextIdError } from '../src/index';

describe('REQUEST scope', () => {
  it('throws MissingContextIdError when resolved without a context', async () => {
    @Injectable({ scope: Scope.REQUEST })
    class PerRequest {}

    @Module({ providers: [PerRequest] })
    class AppModule {}

    const app = await NofaultFactory.createApplicationContext(AppModule, { quiet: true });
    await expect(app.get(PerRequest)).rejects.toThrow(MissingContextIdError);
  });

  it('returns the same instance within one context and a new one per context', async () => {
    @Injectable({ scope: Scope.REQUEST })
    class PerRequest {}

    @Module({ providers: [PerRequest] })
    class AppModule {}

    const app = await NofaultFactory.createApplicationContext(AppModule, { quiet: true });
    const ctxA = {};
    const ctxB = {};

    const a1 = await app.get(PerRequest, ctxA);
    const a2 = await app.get(PerRequest, ctxA);