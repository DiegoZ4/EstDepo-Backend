import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Partido } from './partido.entity';
import { Equipo } from './equipo.entity';
import { Torneo } from './torneo.entity';
import { Jugador } from './jugador.entity';

@Entity()
export class Gol {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Partido, (partido) => partido.goles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'partido_id' })
  partido: Partido;

  @ManyToOne(() => Equipo, (equipo) => equipo.goles, { eager: true })
  @JoinColumn({ name: 'equipo_id' })
  equipo: Equipo;


  @ManyToOne(() => Jugador, (jugador) => jugador.goles, { eager: true })
  @JoinColumn({ name: 'jugador_id' })
  jugador: Jugador;

  @Column()
  minuto: number;

  @ManyToOne(() => Torneo, (torneo) => torneo.partidos)
  @JoinColumn({ name: 'torneo_id' })
  torneo: Torneo;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
