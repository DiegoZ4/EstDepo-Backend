import { TablaService } from '../services/tabla.service';
import { Partido } from '../entities/partido.entity';
import { Equipo } from '../entities/equipo.entity';
import { Torneo } from '../entities/torneo.entity';
import { Pais } from '../entities/pais.entity';
import { Repository } from 'typeorm';
import { Client } from 'pg';
export declare class TablaController {
    private readonly tablaService;
    private clientPg;
    private partidoRepository;
    private equipoRepository;
    private torneoRepository;
    private paisRepository;
    constructor(tablaService: TablaService, clientPg: Client, partidoRepository: Repository<Partido>, equipoRepository: Repository<Equipo>, torneoRepository: Repository<Torneo>, paisRepository: Repository<Pais>);
    getTabla(): void;
}
