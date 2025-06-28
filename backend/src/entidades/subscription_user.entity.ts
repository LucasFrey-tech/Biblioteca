import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../entidades/user.entity"; 
import { Subscription } from "../entidades/subscription.entity"; 
import { ApiProperty } from "@nestjs/swagger";

@Entity('user_subscription')
export class UserSubscription {
  @ApiProperty({ example: 1, description: 'ID de la suscripción de usuario' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => User, description: 'Usuario al que pertenece la suscripción' })
  @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_user' })
  user: User;

  @ApiProperty({ example: '2025-06-27T00:00:00.000Z', description: 'Fecha de inicio de la suscripción' })
  @Column({ name: 'start_date', type: 'timestamp' })
  startDate: Date;

  @ApiProperty({ example: '2026-06-27T00:00:00.000Z', description: 'Fecha de fin de la suscripción' })
  @Column({ name: 'end_date', type: 'timestamp' })
  endDate: Date;

  @ApiProperty({ example: false, description: 'Indica si la suscripción está activa (ongoing)' })
  @Column({ default: false })
  ongoing: boolean;

  @ApiProperty({ type: () => Subscription, description: 'Tipo de suscripción asociada' })
  @ManyToOne(() => Subscription, subscription => subscription.userSubscriptions, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'id_subscription' })
  subscription: Subscription;
}