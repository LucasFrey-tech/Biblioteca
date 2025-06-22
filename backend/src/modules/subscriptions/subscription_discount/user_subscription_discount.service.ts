import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSubscriptionDiscount } from 'src/entidades/user_subscription_discount.entity';

@Injectable()
export class UserSubscriptionDiscountService {
  constructor(
    @InjectRepository(UserSubscriptionDiscount)
    private readonly discountRepository: Repository<UserSubscriptionDiscount>,
  ) {}

  async create(data: Partial<UserSubscriptionDiscount>): Promise<UserSubscriptionDiscount> {
    const discount = this.discountRepository.create(data);
    return this.discountRepository.save(discount);
  }

  async findAll(): Promise<UserSubscriptionDiscount[]> {
    return this.discountRepository.find({ relations: ['subscription'] });
  }

  async findOne(id: number): Promise<UserSubscriptionDiscount> {
    const discount = await this.discountRepository.findOne({
      where: { id },
      relations: ['subscription'],
    });
    if (!discount) {
      throw new NotFoundException(`Discount with ID ${id} not found`);
    }
    return discount;
  }

  async update(id: number, data: Partial<UserSubscriptionDiscount>): Promise<UserSubscriptionDiscount> {
    await this.findOne(id); // Ensure discount exists
    await this.discountRepository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.findOne(id); // Ensure discount exists
    await this.discountRepository.delete(id);
  }
}