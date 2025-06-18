import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UserSubscription } from "../../../entidades/subscription_user.entity";
import { User } from "../../../entidades/user.entity";

@Injectable()
export class UserSubscriptionService {
  constructor(
    @InjectRepository(UserSubscription)
    private userSubscriptionRepository: Repository<UserSubscription>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createSubscription(
    userId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<UserSubscription> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const subscription = new UserSubscription();
    subscription.idUser = userId;
    subscription.startDate = startDate;
    subscription.endDate = endDate;
    subscription.ongoing = true;

    return this.userSubscriptionRepository.save(subscription);
  }

  async getUserSubscriptions(userId: number): Promise<UserSubscription[]> {
    return this.userSubscriptionRepository.find({
      where: { idUser: userId },
      relations: ['user'],
    });
  }

  async cancelSubscription(id: number): Promise<void> {
    const subscription = await this.userSubscriptionRepository.findOne({
      where: { id },
    });
    if (!subscription) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }
    subscription.ongoing = false;
    await this.userSubscriptionRepository.save(subscription);
  }
}