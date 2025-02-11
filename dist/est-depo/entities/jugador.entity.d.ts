import { Equipo } from './equipo.entity';
import { Pais } from './pais.entity';
import { Category } from './category.entity';
import { Gol } from './goles.entity';
export declare class Jugador {
    id: number;
    name: string;
    image: string;
    edad: number;
    posicion: string;
    goles: number;
    asistencias: number;
    fechaNacimiento: Date | null;
    altura: number;
    peso: number;
    tarjetasAmarillas: number;
    tarjetasRojas: number;
    description: string;
    gol: Gol;
    category: Category;
    pais: Pais;
    equipo: Equipo;
    createdAt: Date;
    updatedAt: Date;
}
