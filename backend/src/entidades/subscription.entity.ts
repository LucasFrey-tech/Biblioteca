import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { UserSubscription } from "./subscription_user.entity";
import { ApiOperation, ApiProperty } from "@nestjs/swagger";

@Entity('subscription')
export class Subscription {
  @ApiProperty({example: 1, description: "ID Único de Suscripción"})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 2000, description: "Precio de la Suscripción"})
  @Column({ name: 'price', type: 'float' })
  price: number;

  @ApiProperty({type: () => [UserSubscription] , description: "Usuario Asociado"})
  @OneToMany(() => UserSubscription, userSub => userSub.subscription)
  userSubscriptions: UserSubscription[];
}