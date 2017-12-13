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