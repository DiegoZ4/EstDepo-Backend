import { Jugador } from './jugador.entity';
import { Gol } from './goles.entity';
import { Partido } from './partido.entity';
import { Torneo } from './torneo.entity';
import { Category } from './category.entity';
import { Pais } from './pais.entity';
export declare class Equipo {
    id: number;
    name: string;
    createdOn: number;
    image: string;
    description: string;
    category: Category;
    pais: Pais;
    paisId: number;
    partidosLocal: Partido[];
    partidosVisitante: Partido[];
    torneo: Torneo;
    goles: Gol[];
    jugadores: Jugador[];
    createdAt: Date;
    updatedAt: Date;
}
