import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';
import { Equipo } from '../entities/equipo.entity';
import { CreateEquipoDto, UpdateEquipoDto } from '../dtos/equipo.dto';
import { Repository } from 'typeorm';
import { Pais } from '../entities/pais.entity';
export declare class EquipoService {
    private paisRepo;
    private configService;
    private clientPg;
    private equipoRepo;
    constructor(paisRepo: Repository<Pais>, configService: ConfigService, clientPg: Client, equipoRepo: Repository<Equipo>);
    findAll(): Promise<Equipo[]>;
    findOne(id: number): Promise<Equipo>;
    create(data: CreateEquipoDto): Promise<Equipo>;
    update(id: number, changes: UpdateEquipoDto): Promise<Equipo>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
