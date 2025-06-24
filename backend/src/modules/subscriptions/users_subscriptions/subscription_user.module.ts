import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSubscription } from 'src/entidades/subscription_user.entity';
import { User } from 'src/entidades/user.entity';
import { Subscription } from 'src/entidades/subscription.entity';
import { UserSubscriptionService } from './subscription_user.service';
import { UserSubscriptionController } from './subscription_user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserSubscription,
      User,
      Subscription, 
    ]),
  ],
  providers: [UserSubscriptionService],
  controllers: [UserSubscriptionController],
})
export class UserSubscriptionModule {}