import { PaisService } from '../services/pais.service';
import { CreatePaisDto, UpdatePaisDto } from '../dtos/pais.dto';
export declare class PaisController {
    private paisService;
    constructor(paisService: PaisService);
    getAll(): Promise<import("../entities/pais.entity").Pais[]>;
    getOne(id: number): Promise<import("../entities/pais.entity").Pais>;
    create(payload: CreatePaisDto): Promise<import("../entities/pais.entity").Pais>;
    update(id: number, payload: UpdatePaisDto): Promise<import("../entities/pais.entity").Pais>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
