import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSubscriptionDiscount } from 'src/entidades/user_subscription_discount.entity';
import { UserSubscriptionDiscountService } from './user_subscription_discount.service';
import { UserSubscriptionDiscountController } from './user_subscription_discount.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserSubscriptionDiscount])],
  providers: [UserSubscriptionDiscountService],
  controllers: [UserSubscriptionDiscountController],
})
export class UserSubscriptionDiscountModule {}