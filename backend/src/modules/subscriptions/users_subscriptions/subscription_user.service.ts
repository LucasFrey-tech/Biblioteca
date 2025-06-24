import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException, Logger } from "@nestjs/common";
import { UserSubscription } from "../../../entidades/subscription_user.entity";
import { User } from "../../../entidades/user.entity";
import { Subscription } from "../../../entidades/subscription.entity";
import { UserSubscriptionDTO } from "./user_subscription.dto";

@Injectable()
export class UserSubscriptionService {
  private readonly logger = new Logger(UserSubscriptionService.name);

  constructor(
    @InjectRepository(UserSubscription)
    private userSubscriptionRepository: Repository<UserSubscription>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
  ) {}

  async createSubscription(userId: number, startDate: Date, endDate: Date): Promise<UserSubscription> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      this.logger.log('Usuario No Encontrado');
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const subscriptionConfig = await this.subscriptionRepository.findOne({ where: { id: 1 } });
    if (!subscriptionConfig) {
      this.logger.log('Configuración de suscripción no encontrada');
      throw new NotFoundException('No se encontró configuración de suscripción (ID 1)');
    }

    const subscription = new UserSubscription();
    subscription.user = user;
    subscription.startDate = startDate;
    subscription.endDate = endDate;
    subscription.ongoing = true;
    subscription.subscription = subscriptionConfig;

    this.logger.log('Suscripción Creada');
    return this.userSubscriptionRepository.save(subscription);
  }

  async getUserSubscription(userId: number): Promise<UserSubscriptionDTO> {
    this.logger.log('Obtener Suscripción de Usuario por ID');
    const userSubscriptions = await this.userSubscriptionRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user', 'subscription'],
    });

    if (!userSubscriptions) {
      this.logger.log('Suscripción de usuario no encontrada');
      throw new NotFoundException(`No se encontró suscripción para el usuario con ID ${userId}`);
    }

    return {
      id: userSubscriptions.id,
      startDate: userSubscriptions.startDate.toISOString(),
      endDate: userSubscriptions.endDate.toISOString(),
      ongoing: userSubscriptions.ongoing,
      subscription: userSubscriptions.subscription
        ? {
            id: userSubscriptions.subscription.id,
            price: userSubscriptions.subscription.price,
          }
        : null,
    };
  }
  async getUserSubscriptions(): Promise<UserSubscriptionDTO[]> {
    this.logger.log('Obtener Suscripción de Usuario por ID');
    const userSubscriptions = await this.userSubscriptionRepository.find({
      
      relations: ['user', 'subscription'],
    });
    
    return userSubscriptions.map((sub) => {
      return {
      id: sub.id,
      startDate: sub.startDate.toISOString(),
      endDate: sub.endDate.toISOString(),
      ongoing: sub.ongoing,
      subscription: sub.subscription
        ? {
            id: sub.subscription.id,
            price: sub.subscription.price,
          }
        : null,
    }});
  }

  async cancelSubscription(id: number): Promise<void> {
    const subscription = await this.userSubscriptionRepository.findOne({ where: { id } });
    if (!subscription) {
      this.logger.log('Suscripción No Encontrada');
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }

    subscription.ongoing = false;
    this.logger.log('Subscripción Cancelada');
    await this.userSubscriptionRepository.save(subscription);
  }
}
