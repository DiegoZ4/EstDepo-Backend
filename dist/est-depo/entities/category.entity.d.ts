import { Torneo } from './torneo.entity';
import { Equipo } from './equipo.entity';
import { Jugador } from './jugador.entity';
import { Partido } from './partido.entity';
export declare class Category {
    id: number;
    name: string;
    torneo: Torneo[];
    equipos: Equipo[];
    jugadores: Jugador[];
    partidos: Partido[];
    createdAt: Date;
    updatedAt: Date;
}
