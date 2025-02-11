import { TorneoService } from '../services/torneo.service';
import { CreateTorneoDto, UpdateTorneoDto } from '../dtos/torneo.dto';
export declare class TorneoController {
    private torneoService;
    constructor(torneoService: TorneoService);
    getAll(): Promise<import("../entities/torneo.entity").Torneo[]>;
    getTablaGeneral(): Promise<any[]>;
    getOne(id: number): Promise<import("../entities/torneo.entity").Torneo>;
    create(payload: CreateTorneoDto): Promise<import("../entities/torneo.entity").Torneo>;
    update(id: number, payload: UpdateTorneoDto): Promise<import("../entities/torneo.entity").Torneo>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
