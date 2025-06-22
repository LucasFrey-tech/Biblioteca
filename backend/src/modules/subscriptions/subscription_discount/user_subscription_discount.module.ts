import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSubscriptionDiscount } from 'src/entidades/user_subscription_discount.entity';
import { UserSubscriptionDiscountService } from './user_subscription_discount.service';
import { UserSubscriptionDiscountController } from './user_subscription_discount.controller';
import { SubscriptionModule } from '../subscription_config/subscription_config.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserSubscriptionDiscount]), SubscriptionModule],
  providers: [UserSubscriptionDiscountService],
  controllers: [UserSubscriptionDiscountController],
})
export class UserSubscriptionDiscountModule { }