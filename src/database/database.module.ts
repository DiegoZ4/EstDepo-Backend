import { Module, Global, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '../config';

const API_KEY = "123456789";
const API_KEY_PROD = "PROD123456789";

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (ConfigService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = ConfigService.postgres;
        console.log('🔵 TypeORM Config:', { host, port, user, database: dbName });
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database: dbName,
          synchronize: true, // Crear tablas automáticamente
          autoLoadEntities: true,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (ConfigService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = ConfigService.postgres;
        console.log('🔵 PG Client Config:', { host, port, user, database: dbName });
        const client = new Client({
          user,
          host,
          database: dbName,
          password,
          port,
        });
        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabaseModule { }
