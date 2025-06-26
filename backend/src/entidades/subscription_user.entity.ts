import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../entidades/user.entity"; 
import { Subscription } from "../entidades/subscription.entity"; 

@Entity('user_subscription')
export class UserSubscription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_user' })
  user: User;

  @Column({ name: 'start_date', type: 'timestamp' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'timestamp' })
  endDate: Date;

  @Column({ default: false })
  ongoing: boolean;

  @ManyToOne(() => Subscription, subscription => subscription.userSubscriptions, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'id_subscription' })
  subscription: Subscription;
}