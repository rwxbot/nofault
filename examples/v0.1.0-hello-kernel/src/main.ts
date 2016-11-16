import 'reflect-metadata';
import { createLogger } from '@nofault/logger';
import { createHttpApplication } from '@nofault/http';
import { AppModule } from './app.module';
import { GreeterService } from './greeter.service';
import { createRouter } from './router';