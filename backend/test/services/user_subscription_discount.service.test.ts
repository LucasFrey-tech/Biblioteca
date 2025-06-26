import { getRepositoryToken } from '@nestjs/typeorm';
import { UserSubscriptionDiscount } from '../../src/entidades/user_subscription_discount.entity';
import { UserSubscriptionDiscountService } from '../../src/modules/subscriptions/subscription_discount/user_subscription_discount.service';
import { mockUserSubscriptionDiscountRepository } from '../mocks/repositories/user_subscription_discount.repository.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { Subscription } from 'rxjs';
import { mockSubscriptionRepository } from '../mocks/repositories/subscription.repository.mock';

describe('UserSubscriptionDiscountService', () => {
  let service: UserSubscriptionDiscountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
          providers: [
            UserSubscriptionDiscountService,
            {
              provide: getRepositoryToken(UserSubscriptionDiscount),
              useValue: mockUserSubscriptionDiscountRepository,
            },
            {
              provide: getRepositoryToken(Subscription),
              useValue: mockSubscriptionRepository,
            }
          ],
        }).compile();
    
        service = module.get<UserSubscriptionDiscountService>(UserSubscriptionDiscountService);
  });

  it('instance should be an instanceof UserSubscriptionDiscountService', () => {
    expect(service instanceof UserSubscriptionDiscountService).toBeTruthy();
  });

  it('should have a method create()', async () => {
    // await instance.create(data);
    expect(service.create).toBeTruthy();
  });

  it('should have a method findAll()', async () => {
    // await instance.findAll();
    expect(service.findAll).toBeTruthy();
  });

  it('should have a method findOne()', async () => {
    // await instance.findOne(id);
    expect(service.findOne).toBeTruthy();
  });

  it('should have a method update()', async () => {
    // await instance.update(id,data);
    expect(service.update).toBeTruthy();
  });

  it('should have a method delete()', async () => {
    // await instance.delete(id);
    expect(service.delete).toBeTruthy();
  });
});