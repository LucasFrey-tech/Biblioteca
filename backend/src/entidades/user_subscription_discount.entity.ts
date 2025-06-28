import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Subscription } from './subscription.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user_subscription_discount')
export class UserSubscriptionDiscount {
  @ApiProperty({example: 1, description: "ID Único del Descuento de Suscripcion de Usuario"})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Subscription, description: "Suscripción Asociada"})
  @ManyToOne(() => Subscription, { nullable: false })
  @JoinColumn({ name: 'id_subscription' })
  subscription: Subscription;

  @ApiProperty({example: 25, description: "Porcentaje de Descuento de la Suscripción"})
  @Column({ type: 'float', nullable: false })
  discount: number;
}