import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException, Logger } from "@nestjs/common";
import { UserSubscription } from "../../entidades/subscription_user.entity";
import { User } from "../../entidades/user.entity";

@Injectable()
export class UserSubscriptionService {
  private readonly logger = new Logger(UserSubscriptionService.name);
  constructor(
    @InjectRepository(UserSubscription)
    private userSubscriptionRepository: Repository<UserSubscription>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createSubscription(userId: number, startDate: Date, endDate: Date): Promise<UserSubscription> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      this.logger.log('Usuario No Encontrado');
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const subscription = new UserSubscription();
    subscription.idUser = userId;
    subscription.startDate = startDate;
    subscription.endDate = endDate;
    subscription.ongoing = true;

    this.logger.log('Suscripción Creada');
    return this.userSubscriptionRepository.save(subscription);
  }

  async getUserSubscriptions(userId: number): Promise<UserSubscription[]> {
    this.logger.log('Obtener Suscripción de Usuario por ID');
    return this.userSubscriptionRepository.find({
      where: { idUser: userId },
      relations: ['user'],
    });
  }

  async cancelSubscription(id: number): Promise<void> {
    const subscription = await this.userSubscriptionRepository.findOne({where: { id }});
    if (!subscription) {
      this.logger.log('Suscripción No Encontrada');
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }
    subscription.ongoing = false;

    this.logger.log('Subscripcion Cancelada');
    await this.userSubscriptionRepository.save(subscription);
  }
}