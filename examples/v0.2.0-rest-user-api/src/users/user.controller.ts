import {
  Body,
  Controller,
  Ctx,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  RestContext,
  UseMiddleware,
  ValidateBody,
} from '@nofault/rest';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { timing } from '../middleware/timing';

/**
 * 用户控制器。
 *
 * 演示 v0.2.0 的全部能力：