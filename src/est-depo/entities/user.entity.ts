import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserRole } from '../dtos/user.dto'; // Ajusta la ruta según tu estructura de carpetas

export enum SubscriptionStatus {
  NONE = 'none',
  ACTIVE = 'active',
  PAUSED = 'paused',
  CANCELLED = 'cancelled',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.FREE_USER,
  })
  rol: UserRole;

  @Column({ type: 'date', nullable: true })
  bornDate?: Date;

  @Column({ nullable: true })
  refreshToken?: string;

  // Campos de suscripción Mercado Pago
  @Column({ nullable: true, name: 'subscription_id' })
  subscriptionId?: string;

  @Column({
    type: 'enum',
    enum: SubscriptionStatus,
    default: SubscriptionStatus.NONE,
    name: 'subscription_status',
  })
  subscriptionStatus: SubscriptionStatus;

  @Column({ type: 'date', nullable: true, name: 'subscription_start_date' })
  subscriptionStartDate?: Date;

  @Column({ type: 'date', nullable: true, name: 'subscription_end_date' })
  subscriptionEndDate?: Date;

  @Column({ type: 'boolean', default: false, name: 'pending_cancellation' })
  pendingCancellation: boolean;

  @Column({ nullable: true, name: 'last_payment_id' })
  lastPaymentId?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
