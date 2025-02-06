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

import { Pais } from './pais.entity';

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


  @OneToMany(() => Partido, (partido) => partido.torneo)
  partidos: Partido[];

  @ManyToOne(() => Pais, (pais) => pais.torneos)
  pais: Pais;

  @OneToMany(() => Equipo, (equipo) => equipo.torneo)
  equipos: Equipo[];

  @ManyToMany(() => Category, (category) => category.torneo, { nullable: true })
  categories: Category[];


  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

}