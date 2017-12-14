import { describe, expect, it } from 'vitest';
import { RouteTable, RouteTree, RouteConflictError } from '../src/router/route-tree';

describe('RouteTree', () => {
  it('matches static paths', () => {
    const t = new RouteTree<string>();
    t.add('/users', 'list');
    t.add('/users/new', 'new');
    expect(t.match('/users')?.handler).toBe('list');
    expect(t.match('/users/new')?.handler).toBe('new');
    expect(t.match('/users/other')).toBeUndefined();
  });

  it('compresses common prefixes (radix behaviour)', () => {
    const t = new RouteTree<string>();
    t.add('/user', 'a');
    t.add('/users', 'b');
    t.add('/userx', 'c');
    expect(t.match('/user')?.handler).toBe('a');
    expect(t.match('/users')?.handler).toBe('b');
    expect(t.match('/userx')?.handler).toBe('c');
  });

  it('extracts path params', () => {
    const t = new RouteTree<string>();
    t.add('/users/:id', 'get');
    t.add('/users/:id/posts/:postId', 'post');
    expect(t.match('/users/42')?.params).toEqual({ id: '42' });
    expect(t.match('/users/42/posts/7')?.params).toEqual({ id: '42', postId: '7' });
  });
