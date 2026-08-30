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

import { Torneo } from './torneo.entity';
import { Category } from './category.entity';
import { Llave } from './llave.entity';
import { Partido } from './partido.entity';

export type TipoFase = 'grupos' | 'eliminatoria';

// Una fase agrupa la disputa de una etapa del torneo.
// Evita ensuciar partido.fecha metiendo "octavos", "cuartos", etc. como números.
@Entity()
export class Fase {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Torneo, (torneo) => torneo.fases, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'torneoId' })
  torneo: Torneo;

  @Column({ nullable: true })
  torneoId: number;

  // Las llaves suelen ser por categoría (Primera, Reserva…). Null = aplica a todas.
  @ManyToOne(() => Category, { nullable: true })
  @JoinColumn({ name: 'categoriaId' })
  category: Category;

  @Column({ nullable: true })
  categoriaId: number;

  // "Fase de grupos", "Octavos", "Cuartos", "Semifinal", "Final", "Tercer puesto".
  @Column({ type: 'varchar', length: 40 })
  nombre: string;

  // 'grupos' | 'eliminatoria'
  @Column({ type: 'varchar', length: 15 })
  tipo: TipoFase;

  // Orden de disputa: grupos=0, octavos=1, cuartos=2, semi=3, final=4.
  // Sirve para saber qué fase sigue.
  @Column({ type: 'smallint', default: 0 })
  orden: number;

  // Override por fase del flag del torneo (típico: semis a doble partido, final a uno).
  @Column({ type: 'boolean', default: false })
  idaVuelta: boolean;

  // Solo eliminatoria: 8, 4, 2, 1.
  @Column({ type: 'smallint', nullable: true })
  cantidadLlaves: number;

  @OneToMany(() => Llave, (llave) => llave.fase)
  llaves: Llave[];

  @OneToMany(() => Partido, (partido) => partido.fase)
  partidos: Partido[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
