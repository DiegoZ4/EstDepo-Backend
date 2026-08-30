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
import { Pronostico } from './pronostico.entity';
import { Fase } from './fase.entity';
import { Llave } from './llave.entity';


@Entity()
export class Partido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: string;

  @Column({ type: 'timestamptz', nullable: true })
  date: Date;

  // true = la fecha del partido está confirmada; false = es provisional / aún no se sabe
  @Column({ type: 'boolean', default: false })
  fechaDeterminada: boolean;

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

  @OneToMany(() => Pronostico, (pronostico) => pronostico.partido)
  pronosticos: Pronostico[];


  golesLocal: Gol[] = [];
  golesVisitante: Gol[] = [];

  ganadorId: number | null = null;

  // En eliminatoria puede quedar null y mandar llaveId.
  // Valores válidos: nombre de grupo ("A", "B"…), "grupos" o "eliminatoria".
  @Column({ type: 'varchar', length: 255, nullable: true })
  group: string;

  // ── Copa: fase / bracket ───────────────────────────────────────────
  // null = liga clásica.
  @ManyToOne(() => Fase, (fase) => fase.partidos, { nullable: true })
  @JoinColumn({ name: 'faseId' })
  fase: Fase;

  @Column({ nullable: true })
  faseId: number;

  // A qué cruce del bracket pertenece.
  @ManyToOne(() => Llave, (llave) => llave.partidos, { nullable: true })
  @JoinColumn({ name: 'llaveId' })
  llave: Llave;

  @Column({ nullable: true })
  llaveId: number;

  // false = ida o partido único | true = vuelta.
  @Column({ type: 'boolean', default: false })
  esVuelta: boolean;

  // Definición por penales (null si no hubo).
  @Column({ type: 'smallint', nullable: true })
  golesLocalPenales: number;

  @Column({ type: 'smallint', nullable: true })
  golesVisitantePenales: number;

  // Si se jugó alargue / tiempo suplementario.
  @Column({ type: 'boolean', default: false })
  huboProrroga: boolean;

  // Ganador del partido (con penales el marcador no alcanza para deducirlo).
  @ManyToOne(() => Equipo, { nullable: true })
  @JoinColumn({ name: 'ganadorEquipoId' })
  ganadorEquipo: Equipo;

  @Column({ nullable: true })
  ganadorEquipoId: number;


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
