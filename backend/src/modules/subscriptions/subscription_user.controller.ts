import { Controller, Post, Body, Get, Param, Delete } from "@nestjs/common";
import { UserSubscription } from "src/entidades/subscription_user.entity";
import { UserSubscriptionService } from "./subscription_user.service";

@Controller('user-subscriptions')
export class UserSubscriptionController {
  constructor(private readonly userSubscriptionService: UserSubscriptionService) {}

  @Post()
  async createSubscription(
    @Body('userId') userId: number,
    @Body('startDate') startDate: Date,
    @Body('endDate') endDate: Date,
  ): Promise<UserSubscription> {
    return this.userSubscriptionService.createSubscription(userId, startDate, endDate);
  }

  @Get(':userId')
  async getUserSubscriptions(@Param('userId') userId: number): Promise<UserSubscription[]> {
    return this.userSubscriptionService.getUserSubscriptions(userId);
  }

  @Delete(':id')
  async cancelSubscription(@Param('id') id: number): Promise<void> {
    return this.userSubscriptionService.cancelSubscription(id);
  }
}