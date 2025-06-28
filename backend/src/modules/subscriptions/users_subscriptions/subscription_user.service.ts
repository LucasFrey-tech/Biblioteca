import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException, Logger } from "@nestjs/common";
import { UserSubscription } from "../../../entidades/subscription_user.entity";
import { User } from "../../../entidades/user.entity";
import { Subscription } from "../../../entidades/subscription.entity";
import { UserSubscriptionDTO } from "./dto/user_subscription.dto";

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
  ) { }

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

    const userSubscription = await this.userSubscriptionRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user', 'subscription'],
    });

    if (!userSubscription) {
      this.logger.log('Suscripción de usuario no encontrada');
      throw new NotFoundException(`No se encontró suscripción para el usuario con ID ${userId}`);
    }

    return {
      id: userSubscription.id,
      startDate: userSubscription.startDate.toISOString(),
      endDate: userSubscription.endDate.toISOString(),
      ongoing: userSubscription.ongoing,
      subscription: userSubscription.subscription
        ? {
          id: userSubscription.subscription.id,
          price: userSubscription.subscription.price,
        }
        : null,
    };
  }


  async getUserSubscriptions(): Promise<UserSubscriptionDTO[]> {
    this.logger.log('Obtener todas las suscripciones');

    const userSubscriptions = await this.userSubscriptionRepository.find({
      relations: ['user', 'subscription'],
    });

    return userSubscriptions.map((sub) => ({
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
    }));
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

  async updateSubscription(id: number, data: Partial<UserSubscription>): Promise<UserSubscription> {
    const sub = await this.userSubscriptionRepository.findOne({ where: { id } });

    if (!sub) {
      throw new NotFoundException(`No se encontró suscripción con ID ${id}`);
    }

    Object.assign(sub, data);

    this.logger.log(`Suscripción actualizada para ID ${id}`);
    return this.userSubscriptionRepository.save(sub);
  }
}
