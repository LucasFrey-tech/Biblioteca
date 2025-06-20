import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from 'src/entidades/subscription.entity';
import { SubscriptionService } from './subscription_config.service';
import { SubscriptionController } from './subscription_config.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Subscription, 
    ]),
  ],
  providers: [SubscriptionService],
  controllers: [SubscriptionController],
})
export class SubscriptionModule {}