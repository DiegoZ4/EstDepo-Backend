import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';
import { Gol } from '../entities/goles.entity';
import { CreateGolDto, UpdateGolDto } from '../dtos/goles.dto';
import { Repository } from 'typeorm';
import { Equipo } from '../entities/equipo.entity';
import { Torneo } from '../entities/torneo.entity';
import { Jugador } from '../entities/jugador.entity';
import { Partido } from '../entities/partido.entity';
export declare class GolesService {
    private configService;
    private clientPg;
    private GolesRepo;
    private partidoRepo;
    private equipoRepo;
    private torneoRepo;
    private jugadorRepo;
    constructor(configService: ConfigService, clientPg: Client, GolesRepo: Repository<Gol>, partidoRepo: Repository<Partido>, equipoRepo: Repository<Equipo>, torneoRepo: Repository<Torneo>, jugadorRepo: Repository<Jugador>);
    findAll(): Promise<Gol[]>;
    findOne(id: number): Promise<Gol>;
    create(createGolDto: CreateGolDto): Promise<Gol>;
    update(id: number, changes: UpdateGolDto): Promise<Gol>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
