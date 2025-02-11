import { JugadorService } from '../services/jugador.service';
import { CreateJugadorDto, UpdateJugadorDto } from '../dtos/jugador.dto';
export declare class JugadorController {
    private jugadorService;
    constructor(jugadorService: JugadorService);
    getJugadores(equipoId: string): Promise<import("../entities/jugador.entity").Jugador[]>;
    getAll(): Promise<import("../entities/jugador.entity").Jugador[]>;
    getRankingGoleadores(): Promise<any[]>;
    getOne(id: number): Promise<import("../entities/jugador.entity").Jugador>;
    create(payload: CreateJugadorDto): Promise<import("../entities/jugador.entity").Jugador>;
    update(id: number, payload: UpdateJugadorDto): Promise<import("../entities/jugador.entity").Jugador>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
