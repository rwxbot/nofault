import { Injectable } from '@nofault/core';
import { ConflictException, NotFoundException } from '@nofault/rest';
import { createLogger, type Logger } from '@nofault/logger';
import {
  findAll,
  findByEmail,
  findById,
  nextId,
  remove,
  save,
  type User,
} from './user.model';

@Injectable()
export class UserService {
  private readonly logger: Logger = createLogger({ context: 'UserService' });

  list(keyword?: string, limit = 20): User[] {
    const all = findAll();
    const filtered = keyword ? all.filter((u) => u.name.includes(keyword) || u.email.includes(keyword)) : all;
    return filtered.slice(0, limit);
  }

  get(id: number): User {
    const user = findById(id);
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }
