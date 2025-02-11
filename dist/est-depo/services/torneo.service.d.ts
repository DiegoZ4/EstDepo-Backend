import { ConfigService } from '@nestjs/config';
import { Equipo } from '../entities/equipo.entity';
import { Partido } from '../entities/partido.entity';
import { Pais } from '../entities/pais.entity';
import { Torneo } from '../entities/torneo.entity';
import { CreateTorneoDto, UpdateTorneoDto } from '../dtos/torneo.dto';
import { Repository } from 'typeorm';
export declare class TorneoService {
    private configService;
    private torneoRepo;
    private equipoRepo;
    private partidoRepo;
    private paisRepo;
    constructor(configService: ConfigService, torneoRepo: Repository<Torneo>, equipoRepo: Repository<Equipo>, partidoRepo: Repository<Partido>, paisRepo: Repository<Pais>);
    findAll(): Promise<Torneo[]>;
    findOne(id: number): Promise<Torneo>;
    create(data: CreateTorneoDto): Promise<Torneo>;
    getTablaGeneral(): Promise<any[]>;
    update(id: number, changes: UpdateTorneoDto): Promise<Torneo>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
