import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Subscription } from './subscription.entity';

@Entity('user_subscription_discount')
export class UserSubscriptionDiscount {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Subscription, { nullable: false })
  @JoinColumn({ name: 'id_subscription' })
  subscription: Subscription;

  @Column({ name: 'id_subscription', insert: false, update: false })
  id_subscription: number;

  @Column({ type: 'float', nullable: false })
  discount: number;
}