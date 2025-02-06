import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
  AfterLoad
} from 'typeorm';

import { Jugador } from './jugador.entity';
import { Gol } from './goles.entity';
import { Partido } from './partido.entity';
import { Torneo } from './torneo.entity';
import { Category } from './category.entity';
import { Pais } from './pais.entity';
import { after } from 'node:test';

@Entity()
export class Equipo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255
  })
  name: string;

  @Column()
  createdOn: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  image: string;

  @Column({
    type: 'varchar',
    length: 255
  })
  description: string;

  @ManyToOne(() => Category, (category) => category.equipos)
  category: Category;

  @ManyToOne(() => Pais, (pais) => pais.equipos)
  @JoinColumn({ name: 'paisId' }) // Especifica que "paisId" es la clave foránea
  pais: Pais;

  @Column({ nullable: true }) // Esta columna almacena la referencia al id de "Pais"
  paisId: number;

  @OneToMany(() => Partido, (partido) => partido.equipoLocal, { cascade: true })
  partidosLocal: Partido[];

  @OneToMany(() => Partido, (partido) => partido.equipoVisitante, { cascade: true })
  partidosVisitante: Partido[];

  @ManyToOne(() => Torneo, (torneo) => torneo.equipos)
  torneo: Torneo;

  @OneToMany(() => Gol, (goles) => goles.equipo, { cascade: true })
  goles: Gol[];

  @OneToMany(() => Jugador, (jugador) => jugador.equipo)
  jugadores: Jugador[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;


}