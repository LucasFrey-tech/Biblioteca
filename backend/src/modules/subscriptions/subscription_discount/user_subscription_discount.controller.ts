import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { UserSubscriptionDiscountService } from './user_subscription_discount.service';
import { UserSubscriptionDiscount } from 'src/entidades/user_subscription_discount.entity';

@Controller('user-subscription-discount')
export class UserSubscriptionDiscountController {
  constructor(private readonly discountService: UserSubscriptionDiscountService) {}

  @Post()
  create(@Body() data: { id_subscription: number; discount: number }): Promise<UserSubscriptionDiscount> {
    return this.discountService.create(data);
  }

  @Get()
  findAll(): Promise<UserSubscriptionDiscount[]> {
    return this.discountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UserSubscriptionDiscount> {
    return this.discountService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: { discount: number },
  ): Promise<UserSubscriptionDiscount> {
    return this.discountService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.discountService.delete(id);
  }
}
