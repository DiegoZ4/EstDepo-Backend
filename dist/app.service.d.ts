import { ConfigType } from '@nestjs/config';
import config from './config';
import { Client } from 'pg';
export declare class AppService {
    private tasks;
    private configService;
    private clientPg;
    constructor(tasks: any[], configService: ConfigType<typeof config>, clientPg: Client);
    getHello(): string;
    getTasks(): Promise<unknown>;
}
