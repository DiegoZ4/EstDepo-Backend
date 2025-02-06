import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn
} from 'typeorm';

import { Equipo } from './equipo.entity';

import { Pais } from './pais.entity';

import { Partido } from './partido.entity';

import { Category } from './category.entity';
import { Gol } from './goles.entity';

@Entity()
export class Jugador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255
  })
  name: string;

  @Column(
    {
      type: 'varchar',
      length: 255,
      nullable: true,
    }
  )
  image: string;

  @Column({ type: 'int' })
  edad: number;


  @Column({ type: 'varchar', length: 255, default: 'Portero' })
  posicion: string;

  @Column({ type: 'int', default: 0 })
  goles: number;

  @Column({ type: 'int', default: 0 })
  asistencias: number;

  @Column({ type: 'date', nullable: true })
  fechaNacimiento: Date | null;


  @Column({ type: 'float', nullable: true })
  altura: number;

  @Column({ type: 'float', nullable: true })
  peso: number;

  @Column({ type: 'int', default: 0 })
  tarjetasAmarillas: number;

  @Column({ type: 'int', default: 0 })
  tarjetasRojas: number;


  @Column({
    type: 'varchar',
    length: 255,
    nullable: true
  })
  description: string;

  @OneToMany(() => Gol, (gol) => gol.jugador)
  gol: Gol;

  @ManyToOne(() => Category, (category) => category.jugadores, { eager: true })
  category: Category;


  @ManyToOne(() => Pais, (pais) => pais.jugadores, { eager: true })
  pais: Pais;

  @ManyToOne(() => Equipo, (equipo) => equipo.jugadores, { eager: true })
  @JoinColumn({ name: 'equipoId' })
  equipo: Equipo;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

}