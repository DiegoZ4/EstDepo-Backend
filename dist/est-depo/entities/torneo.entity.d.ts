import { Equipo } from './equipo.entity';
import { Category } from './category.entity';
import { Partido } from './partido.entity';
import { Pais } from './pais.entity';
export declare class Torneo {
    id: number;
    name: string;
    image: string;
    description: string;
    partidos: Partido[];
    pais: Pais;
    equipos: Equipo[];
    categories: Category[];
    createdAt: Date;
    updatedAt: Date;
}
