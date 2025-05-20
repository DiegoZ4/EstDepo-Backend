import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  AfterLoad
} from 'typeorm';
import { Expose } from 'class-transformer';
import { Equipo } from './equipo.entity';
import { Torneo } from './torneo.entity';
import { Category } from './category.entity';
import { Gol } from './goles.entity';


@Entity()
export class Partido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: string;

  @Column({ type: 'timestamptz' })
  date: Date;

  @ManyToOne(() => Equipo, (equipo) => equipo.partidosLocal)
  @JoinColumn({ name: 'equipo_local_id' })
  equipoLocal: Equipo;

  @ManyToOne(() => Equipo, (equipo) => equipo.partidosVisitante)
  @JoinColumn({ name: 'equipo_visitante_id' })
  equipoVisitante: Equipo;

  @Column({ type: 'varchar', length: 255, nullable: true })
  groupLocal: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  groupVisitante: string;



  @OneToMany(() => Gol, (gol) => gol.partido, { cascade: true, eager: true })
  goles: Gol[];


  golesLocal: Gol[] = [];
  golesVisitante: Gol[] = [];

  ganadorId: number | null = null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  group: string;


  @AfterLoad()
  calculateGoles() {
    if (this.goles && this.equipoLocal && this.equipoVisitante) {
      this.golesLocal = this.goles.filter((gol) => gol.equipo && gol.equipo.id === this.equipoLocal.id);
      this.golesVisitante = this.goles.filter((gol) => gol.equipo && gol.equipo.id === this.equipoVisitante.id);

    }
  }

  @AfterLoad()
  calculateGanador() {
    if (this.golesLocal.length > this.golesVisitante.length) {
      this.ganadorId = this.equipoLocal.id;
    } else if (this.golesLocal.length < this.golesVisitante.length) {
      this.ganadorId = this.equipoVisitante.id;
    }
  }

  @ManyToOne(() => Torneo, (torneo) => torneo.partidos)
  @JoinColumn({ name: 'torneo_id' })
  torneo: Torneo;

  @ManyToOne(() => Category, (category) => category.partidos)
  @JoinColumn({ name: 'categoria_id' })
  category: Category;

  @Column({
    type: 'varchar',
    length: 255,
    default: 'Pendiente',
  })
  estado: string;


  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
