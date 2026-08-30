import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Fase } from './fase.entity';
import { Category } from './category.entity';
import { Equipo } from './equipo.entity';
import { Partido } from './partido.entity';

export type LadoLlave = 'local' | 'visitante';

// El cruce del bracket. Permite pre-crear los cruces vacíos
// ("1° Grupo A vs 2° Grupo B", "Ganador Llave 1 vs Ganador Llave 2")
// antes de saber los equipos, y dibujar el bracket.
@Entity()
export class Llave {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Fase, (fase) => fase.llaves, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'faseId' })
  fase: Fase;

  @Column({ nullable: true })
  faseId: number;

  @ManyToOne(() => Category, { nullable: true })
  @JoinColumn({ name: 'categoriaId' })
  category: Category;

  @Column({ nullable: true })
  categoriaId: number;

  // Posición en el bracket (1..N).
  @Column({ type: 'smallint' })
  numero: number;

  // Null hasta que se resuelva la fase anterior.
  @ManyToOne(() => Equipo, { nullable: true })
  @JoinColumn({ name: 'equipoLocalId' })
  equipoLocal: Equipo;

  @Column({ nullable: true })
  equipoLocalId: number;

  @ManyToOne(() => Equipo, { nullable: true })
  @JoinColumn({ name: 'equipoVisitanteId' })
  equipoVisitante: Equipo;

  @Column({ nullable: true })
  equipoVisitanteId: number;

  // Referencia simbólica mientras no hay equipo: "1A" (1° del grupo A), "G-LL1" (ganador llave 1).
  @Column({ type: 'varchar', length: 30, nullable: true })
  origenLocal: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  origenVisitante: string;

  // A qué llave avanza el ganador.
  @ManyToOne(() => Llave, { nullable: true })
  @JoinColumn({ name: 'llaveSiguienteId' })
  llaveSiguiente: Llave;

  @Column({ nullable: true })
  llaveSiguienteId: number;

  // En qué lado cae en la llave siguiente: 'local' | 'visitante'.
  @Column({ type: 'varchar', length: 10, nullable: true })
  ladoSiguiente: LadoLlave;

  // Quién pasó (se setea al cerrar la llave).
  @ManyToOne(() => Equipo, { nullable: true })
  @JoinColumn({ name: 'ganadorEquipoId' })
  ganadorEquipo: Equipo;

  @Column({ nullable: true })
  ganadorEquipoId: number;

  @OneToMany(() => Partido, (partido) => partido.llave)
  partidos: Partido[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
