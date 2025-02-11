import { Partido } from './partido.entity';
import { Equipo } from './equipo.entity';
import { Torneo } from './torneo.entity';
import { Jugador } from './jugador.entity';
export declare class Gol {
    id: number;
    partido: Partido;
    equipo: Equipo;
    jugador: Jugador;
    minuto: number;
    torneo: Torneo;
    createdAt: Date;
    updatedAt: Date;
}
