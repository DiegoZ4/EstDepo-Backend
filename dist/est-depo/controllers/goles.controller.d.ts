import { GolesService } from '../services/goles.service';
import { CreateGolDto, UpdateGolDto } from '../dtos/goles.dto';
export declare class GolesController {
    private golesService;
    constructor(golesService: GolesService);
    getAll(): Promise<import("../entities/goles.entity").Gol[]>;
    getOne(id: number): Promise<import("../entities/goles.entity").Gol>;
    create(payload: CreateGolDto): Promise<import("../entities/goles.entity").Gol>;
    update(id: number, payload: UpdateGolDto): Promise<import("../entities/goles.entity").Gol>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
