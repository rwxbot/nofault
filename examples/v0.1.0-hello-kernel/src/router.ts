import type { IncomingMessage, ServerResponse } from 'node:http';
import type { HttpHandler } from '@nofault/core';
import { sendJson, sendText } from '@nofault/http';
import type { GreeterService } from './greeter.service';

/**
 * v0.1.0 的路由：手写 switch。
 *