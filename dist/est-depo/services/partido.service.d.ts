import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';
import { Partido } from '../entities/partido.entity';
import { CreatePartidoDto, UpdatePartidoDto } from '../dtos/partido.dto';
import { Repository } from 'typeorm';
import { Equipo } from '../entities/equipo.entity';
import { Torneo } from '../entities/torneo.entity';
import { Jugador } from '../entities/jugador.entity';
import { Category } from '../entities/category.entity';
import { Gol } from '../entities/goles.entity';
export declare class PartidoService {
    private configService;
    private clientPg;
    private partidoRepo;
    private equipoRepo;
    private torneoRepo;
    private jugadorRepo;
    private categoryRepo;
    private golRepo;
    constructor(configService: ConfigService, clientPg: Client, partidoRepo: Repository<Partido>, equipoRepo: Repository<Equipo>, torneoRepo: Repository<Torneo>, jugadorRepo: Repository<Jugador>, categoryRepo: Repository<Category>, golRepo: Repository<Gol>);
    findAll(): Promise<Partido[]>;
    findOne(id: number): Promise<Partido>;
    create(createPartidoDto: CreatePartidoDto): Promise<Partido>;
    update(id: number, updatePartidoDto: UpdatePartidoDto): Promise<Partido>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    private validateEquipos;
}
