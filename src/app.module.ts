import { Module } from '@nestjs/common';
import { HttpService, HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { lastValueFrom } from 'rxjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import { EstDepoModule } from './est-depo/est-depo.module';
import { AuthModule } from './auth/auth.module';
import { SubscriptionModule } from './subscriptions/subscription.module';
import config from './config';



@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),  // Cambiado a string
        DATABASE_NAME: Joi.string().required(),
        PORT: Joi.number().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_HOST: Joi.string().required(),
        MERCADOPAGO_ACCESS_TOKEN: Joi.string().optional(),
        MERCADOPAGO_PUBLIC_KEY: Joi.string().optional(),
        MERCADOPAGO_PREAPPROVAL_PLAN_ID: Joi.string().optional(),
        PUBLIC_URL: Joi.string().optional(),
      }),
    }),
    DatabaseModule,
    EstDepoModule,
    AuthModule,
    SubscriptionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        try {
          const request = http.get('https://jsonplaceholder.typicode.com/todos');
          const tasks = await lastValueFrom(request);
          return tasks.data;
        } catch (error) {
          console.error('Error fetching tasks:', error);
          throw new Error('Failed to fetch tasks');
        }
      },
      inject: [HttpService],
    },

  ],
})
export class AppModule { }
