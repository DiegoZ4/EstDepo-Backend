import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Torneo } from './torneo.entity';
import { Equipo } from './equipo.entity';
import { Jugador } from './jugador.entity';
import { Partido } from './partido.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToMany(() => Torneo, (torneo) => torneo.categories, { nullable: true })
  @JoinTable()
  torneo: Torneo[];


  @OneToMany(() => Equipo, (equipo) => equipo.category)
  equipos: Equipo[];

  @OneToMany(() => Jugador, (jugador) => jugador.category)
  jugadores: Jugador[];

  @OneToMany(() => Partido, (partido) => partido.category)
  partidos: Partido[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
