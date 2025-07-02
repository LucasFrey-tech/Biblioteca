import { getRepositoryToken, InjectRepository } from "@nestjs/typeorm";
import { Subscription } from "../../src/entidades/subscription.entity";
import { SubscriptionService } from "../../src/modules/subscriptions/subscription_config/subscription_config.service";
import { Test, TestingModule } from "@nestjs/testing";
import { mockSubscriptionRepository } from "test/mocks/repositories/subscription.repository.mock";
import { UserSubscription } from "src/entidades/subscription_user.entity";
import { mockUserSubscriptionRepository } from "test/mocks/repositories/subscription_user.mock.repository";
import { User } from "src/entidades/user.entity";
import { mockUsersRepository } from "test/mocks/repositories/users.repository.mock";

describe('SubscriptionService', () => {
  let service: SubscriptionService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubscriptionService,
        {
          provide: getRepositoryToken(Subscription),
          useValue: mockSubscriptionRepository,
        },
        {
          provide: getRepositoryToken(UserSubscription),
          useValue: mockUserSubscriptionRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<SubscriptionService>(SubscriptionService);
  });

  it('SubscriptionService', () => {
    expect(service).toBeTruthy();
  });

  it('get()', async () => {
    const result = await service.get();
    expect(mockSubscriptionRepository.findOne).toHaveBeenCalled()
    expect(service.get).toBeTruthy();
  });
  
  it('should have a method update()', async () => {
    const result = await service.update(1,{});
    expect(mockSubscriptionRepository.update).toHaveBeenCalled()
    expect(service.update).toBeTruthy();
  });
  
  it('should have a method create()', async () => {
    const result = await service.create({
      id: 1,
      price: 1000
    });
    expect(mockSubscriptionRepository.create).toHaveBeenCalled()
    expect(service.create).toBeTruthy();
  });
});