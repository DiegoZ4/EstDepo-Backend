import { Equipo } from '../entities/equipo.entity';
import { EquipoService } from '../services/equipo.service';
import { CreateEquipoDto, UpdateEquipoDto } from '../dtos/equipo.dto';
export declare class EquipoController {
    private equipoService;
    constructor(equipoService: EquipoService);
    getAll(): Promise<Equipo[]>;
    getOne(id: number): Promise<Equipo>;
    create(payload: CreateEquipoDto): Promise<Equipo>;
    update(id: number, payload: UpdateEquipoDto): Promise<Equipo>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
