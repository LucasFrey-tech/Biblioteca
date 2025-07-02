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
    expect(service).toBeTruthy();
  });

  it('should have a method create()', async () => {
    const result = service.create({
      id_subscription: 1,
      discount: 10
    })
    expect(mockSubscriptionRepository.findOne).toHaveBeenCalled()
    expect(service.create).toBeTruthy();
  });
  
  it('should have a method findAll()', async () => {
    const result = service.findAll()
    expect(mockUserSubscriptionDiscountRepository.find).toHaveBeenCalled()
    expect(service.findAll).toBeTruthy();
  });
  
  it('should have a method findOne()', async () => {
    const result = service.findOne(1)
    expect(mockUserSubscriptionDiscountRepository.findOne).toHaveBeenCalled()
    expect(service.findOne).toBeTruthy();
  });
  
  it('should have a method update()', async () => {
    const result = service.update(1,{
      discount: 10
    });
    expect(service.update).toBeTruthy();
  });
  
  it('should have a method delete()', async () => {
    const result = service.delete(1);
    expect(service.delete).toBeTruthy();
  });
});