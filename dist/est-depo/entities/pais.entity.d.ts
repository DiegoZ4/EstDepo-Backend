import { Equipo } from './equipo.entity';
import { Torneo } from './torneo.entity';
import { Jugador } from './jugador.entity';
export declare class Pais {
    id: number;
    name: string;
    image: string;
    description: string;
    equipos: Equipo[];
    torneos: Torneo[];
    jugadores: Jugador[];
    createdAt: Date;
    updatedAt: Date;
}
