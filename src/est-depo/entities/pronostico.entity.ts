import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { User } from './user.entity';
import { Partido } from './partido.entity';
import { Equipo } from './equipo.entity';

// Un usuario solo puede tener un pronóstico por partido (se actualiza si lo cambia)
@Entity()
@Unique(['user', 'partido'])
export class Pronostico {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Partido, (partido) => partido.pronosticos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'partido_id' })
  partido: Partido;

  // Equipo que el usuario cree que va a ganar (debe ser el local o el visitante del partido)
  @ManyToOne(() => Equipo, { eager: true })
  @JoinColumn({ name: 'equipo_elegido_id' })
  equipoElegido: Equipo;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
