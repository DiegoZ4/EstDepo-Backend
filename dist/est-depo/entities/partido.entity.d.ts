import { Equipo } from './equipo.entity';
import { Torneo } from './torneo.entity';
import { Category } from './category.entity';
import { Gol } from './goles.entity';
export declare class Partido {
    id: number;
    fecha: string;
    date: Date;
    equipoLocal: Equipo;
    equipoVisitante: Equipo;
    goles: Gol[];
    golesLocal: Gol[];
    golesVisitante: Gol[];
    ganadorId: number | null;
    calculateGoles(): void;
    calculateGanador(): void;
    torneo: Torneo;
    category: Category;
    estado: string;
    createdAt: Date;
    updatedAt: Date;
}
