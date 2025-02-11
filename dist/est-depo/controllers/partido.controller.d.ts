import { PartidoService } from '../services/partido.service';
import { CreatePartidoDto, UpdatePartidoDto } from '../dtos/partido.dto';
export declare class PartidoController {
    private partidoService;
    constructor(partidoService: PartidoService);
    getAll(): Promise<import("../entities/partido.entity").Partido[]>;
    getOne(id: number): Promise<import("../entities/partido.entity").Partido>;
    create(payload: CreatePartidoDto): Promise<import("../entities/partido.entity").Partido>;
    update(id: number, payload: UpdatePartidoDto): Promise<import("../entities/partido.entity").Partido>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
