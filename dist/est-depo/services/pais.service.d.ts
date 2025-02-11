import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';
import { Pais } from '../entities/pais.entity';
import { CreatePaisDto, UpdatePaisDto } from '../dtos/pais.dto';
import { Repository } from 'typeorm';
export declare class PaisService {
    private configService;
    private clientPg;
    private paisRepo;
    constructor(configService: ConfigService, clientPg: Client, paisRepo: Repository<Pais>);
    findAll(): Promise<Pais[]>;
    findOne(id: number): Promise<Pais>;
    create(data: CreatePaisDto): Promise<Pais>;
    update(id: number, changes: UpdatePaisDto): Promise<Pais>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
