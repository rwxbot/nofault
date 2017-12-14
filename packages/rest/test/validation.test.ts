import { describe, expect, it } from 'vitest';
import 'reflect-metadata';
import { IsEmail, IsInt, IsNotEmpty, Max, Min, MinLength, validateDto } from '../src/validation';

class DemoDto {
  @IsNotEmpty()
  @MinLength(2)
  name!: string;

  @IsEmail()
  email!: string;