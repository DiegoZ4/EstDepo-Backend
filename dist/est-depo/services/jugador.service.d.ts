import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';
import { Pais } from '../entities/pais.entity';
import { Equipo } from '../entities/equipo.entity';
import { Category } from '../entities/category.entity';
import { Gol } from '../entities/goles.entity';
import { Jugador } from '../entities/jugador.entity';
import { CreateJugadorDto, UpdateJugadorDto } from '../dtos/jugador.dto';
import { Repository } from 'typeorm';
export declare class JugadorService {
    private configService;
    private paisRepo;
    private equipoRepo;
    private clientPg;
    private golesRepo;
    private categoryRepo;
    private jugadorRepo;
    constructor(configService: ConfigService, paisRepo: Repository<Pais>, equipoRepo: Repository<Equipo>, clientPg: Client, golesRepo: Repository<Gol>, categoryRepo: Repository<Category>, jugadorRepo: Repository<Jugador>);
    findAll(): Promise<Jugador[]>;
    getRankingGoleadores(): Promise<any[]>;
    findOne(id: number): Promise<Jugador>;
    findByEquipo(equipoId: number): Promise<Jugador[]>;
    create(data: CreateJugadorDto): Promise<Jugador>;
    update(id: number, updateJugadorDto: UpdateJugadorDto): Promise<Jugador>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
