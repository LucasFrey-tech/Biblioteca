import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { UserSubscription } from "./subscription_user.entity";

@Entity('subscription')
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'price', type: 'float' })
  price: number;

  @OneToMany(() => UserSubscription, userSub => userSub.subscription)
  userSubscriptions: UserSubscription[];
}