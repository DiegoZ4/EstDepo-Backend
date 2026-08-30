import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  ManyToOne
} from 'typeorm';

import { Equipo } from './equipo.entity';
import { Category } from './category.entity';
import { Partido } from './partido.entity';
import { Fase } from './fase.entity';

import { Pais } from './pais.entity';

export type FormatoTorneo = 'liga' | 'copa';

// Cómo se resuelve una llave empatada.
export type CriterioDesempateLlave =
  | 'penales'
  | 'prorroga'
  | 'gol_visitante'
  | 'mejor_posicionado';

@Entity()
export class Torneo {
  @PrimaryGeneratedColumn({ type: 'int' }) // Incremental por defecto
  id: number;


  @Column({
    type: 'varchar',
    length: 255
  })
  name: string;


  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;



  @Column({
    type: 'varchar',
    length: 255
  })
  description: string;

  @Column("simple-array", { nullable: true })
  groups: string[];


  @OneToMany(() => Partido, (partido) => partido.torneo)
  partidos: Partido[];

  @ManyToOne(() => Pais, (pais) => pais.torneos)
  pais: Pais;

  @OneToMany(() => Equipo, (equipo) => equipo.torneo)
  equipos: Equipo[];

  @ManyToMany(() => Category, (category) => category.torneo, { nullable: true })
  categories: Category[];

  // En formato 'copa' representa las fechas de la fase de grupos.
  @Column({ nullable: true })
  fechas: number;

  // ── Formato del torneo ─────────────────────────────────────────────
  // 'liga' = todos contra todos (lo actual) | 'copa' = fase de grupos + eliminatoria.
  @Column({ type: 'varchar', length: 10, default: 'liga' })
  formato: FormatoTorneo;

  // Solo aplica en 'copa'. false => eliminatoria directa desde el arranque.
  @Column({ type: 'boolean', default: true })
  tieneFaseGrupos: boolean;

  // Cuántos equipos de cada grupo pasan a la eliminatoria.
  @Column({ type: 'smallint', default: 2 })
  equiposClasificanPorGrupo: number;

  // Si las llaves de eliminatoria se juegan a ida y vuelta.
  @Column({ type: 'boolean', default: false })
  idaVueltaEliminatoria: boolean;

  // Si la fase de grupos se juega a doble rueda.
  @Column({ type: 'boolean', default: false })
  idaVueltaGrupos: boolean;

  // 'penales' | 'prorroga' | 'gol_visitante' | 'mejor_posicionado'
  @Column({ type: 'varchar', length: 20, default: 'penales' })
  criterioDesempateLlave: CriterioDesempateLlave;

  @OneToMany(() => Fase, (fase) => fase.torneo)
  fases: Fase[];


  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;


}