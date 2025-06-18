import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserSubscription } from "src/entidades/subscription_user.entity";
import { User } from "src/entidades/user.entity";
import { UserSubscriptionController } from "./subscription_user.controller";
import { UserSubscriptionService } from "./subscription_user.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserSubscription, User])],
  providers: [UserSubscriptionService],
  controllers: [UserSubscriptionController],
})
export class UserSubscriptionModule {}