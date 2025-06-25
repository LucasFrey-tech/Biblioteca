import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSubscriptionDiscount } from '../../../../src/entidades/user_subscription_discount.entity';
import { Subscription } from '../../../../src/entidades/subscription.entity';

@Injectable()
export class UserSubscriptionDiscountService {
  constructor(
    @InjectRepository(UserSubscriptionDiscount)
    private readonly discountRepo: Repository<UserSubscriptionDiscount>,

    @InjectRepository(Subscription)
    private readonly subscriptionRepo: Repository<Subscription>,
  ) {}

  async create(data: { id_subscription: number; discount: number }): Promise<UserSubscriptionDiscount> {
    const subscription = await this.subscriptionRepo.findOne({ where: { id: data.id_subscription } });
    if (!subscription) throw new NotFoundException('Subscription no encontrada');

    const discount = this.discountRepo.create({
      subscription,
      discount: data.discount,
    });

    return this.discountRepo.save(discount);
  }

  async findAll(): Promise<UserSubscriptionDiscount[]> {
    return this.discountRepo.find({ relations: ['subscription'] });
  }

  async findOne(id: number): Promise<UserSubscriptionDiscount> {
    const discount = await this.discountRepo.findOne({ where: { id }, relations: ['subscription'] });
    if (!discount) {
      throw new NotFoundException(`Descuento con ID ${id} no encontrado`);
    }
    return discount;
  }

  async update(id: number, data: { discount: number }): Promise<UserSubscriptionDiscount> {
    const existing = await this.findOne(id);
    existing.discount = data.discount;
    return this.discountRepo.save(existing);
  }

  async delete(id: number): Promise<void> {
    await this.findOne(id);
    await this.discountRepo.delete(id);
  }
}
