import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { Equipo } from './equipo.entity';
import { Torneo } from './torneo.entity';
import { Category } from './category.entity';

@Entity('equipos_libres')
@Unique(['torneo', 'category', 'fecha', 'equipo']) // evita duplicados
export class EquipoLibre {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Equipo, { eager: true })
  @JoinColumn({ name: 'equipo_id' })
  equipo: Equipo;

  @ManyToOne(() => Torneo)
  @JoinColumn({ name: 'torneo_id' })
  torneo: Torneo;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoria_id' })
  category: Category;

  @Column()
  fecha: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
