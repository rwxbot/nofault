import { describe, expect, it, vi } from 'vitest';
import { existsSync, mkdtempSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { FileTransport, LogLevel, Logger, MemoryTransport, createLogger } from '../src/index';

function tmpdir_(): string {
  return mkdtempSync(join(tmpdir(), 'nofault-log-'));
}

describe('FileTransport', () => {
  it('appends lines to the file', async () => {
    const dir = tmpdir_();
    const file = join(dir, 'app.log');
    const t = new FileTransport({ filePath: file });
    t.write('line one', { timestamp: '', level: LogLevel.INFO, levelName: 'info', message: 'line one' });
    t.write('line two', { timestamp: '', level: LogLevel.INFO, levelName: 'info', message: 'line two' });
    await t.flush();
    expect(readFileSync(file, 'utf8')).toBe('line one\nline two\n');
  });

  it('creates missing directories', () => {
    const dir = tmpdir_();
    const file = join(dir, 'nested', 'deep', 'app.log');
    new FileTransport({ filePath: file });
    expect(existsSync(file)).toBe(true);
  });

  it('close() drains the whole async queue in order', async () => {
    const dir = tmpdir_();
    const file = join(dir, 'close.log');
    const t = new FileTransport({ filePath: file, flushEvery: 1 });
    const mk = (m: string) => ({ timestamp: '', level: LogLevel.INFO, levelName: 'info', message: m });
    // 每条都各自排一次异步写 —— 若失去串行队列，行序必然打乱，这条用例就是防线
    for (let i = 1; i <= 50; i++) t.write(`line ${i}`, mk(`line ${i}`));
    await t.close();
    const expected = Array.from({ length: 50 }, (_, i) => `line ${i + 1}`).join('\n') + '\n';
    expect(readFileSync(file, 'utf8')).toBe(expected);
  });

  it('flushSync() persists immediately when the queue is idle', () => {
    const dir = tmpdir_();
    const file = join(dir, 'sync.log');
    // flushEvery > 1：write 不会触发 fire-and-forget，此刻队列必然为空
    const t = new FileTransport({ filePath: file, flushEvery: 100 });
    const mk = (m: string) => ({ timestamp: '', level: LogLevel.INFO, levelName: 'info', message: m });
    t.write('fast', mk('fast'));
    expect(readFileSync(file, 'utf8')).toBe('');
    t.flushSync();
    expect(readFileSync(file, 'utf8')).toBe('fast\n');
  });

  it('flushSync() keeps line order when nothing is in flight', () => {
    const dir = tmpdir_();
    const file = join(dir, 'sync2.log');
    const t = new FileTransport({ filePath: file, flushEvery: 100 });
    const mk = (m: string) => ({ timestamp: '', level: LogLevel.INFO, levelName: 'info', message: m });
    t.write('a', mk('a'));
    t.write('b', mk('b'));
    t.flushSync();