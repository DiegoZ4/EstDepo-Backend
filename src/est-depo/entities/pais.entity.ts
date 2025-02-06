import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';

import { Equipo } from './equipo.entity';

import { Torneo } from './torneo.entity';

import { Partido } from './partido.entity';

import { Jugador } from './jugador.entity';



@Entity()
export class Pais {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255
  })
  name: string;

  @Column()
  image: string;

  @Column({
    type: 'varchar',
    length: 255
  })
  description: string;

  @OneToMany(() => Equipo, (equipo) => equipo.pais)
  equipos: Equipo[];



  @OneToMany(() => Torneo, (torneo) => torneo.pais)
  torneos: Torneo[]

  @OneToMany(() => Jugador, (jugador) => jugador.pais)
  jugadores: Jugador[]



  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

}