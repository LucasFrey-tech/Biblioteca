import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../src/entidades/user.entity';
import { UserSubscription } from '../../src/entidades/subscription_user.entity';
import { UserSubscriptionService } from '../../src/modules/subscriptions/subscription_user.service';

describe('UserSubscriptionService', () => {
  let service: UserSubscriptionService;
  let userSubscriptionRepo: jest.Mocked<Repository<UserSubscription>>;
  let userRepo: jest.Mocked<Repository<User>>;

  const mockUser = { id: 1 } as User;
  const mockSubscription = {
    id: 1,
    idUser: 1,
    startDate: new Date(),
    endDate: new Date(),
    ongoing: true,
  } as UserSubscription;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserSubscriptionService,
        {
          provide: getRepositoryToken(UserSubscription),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserSubscriptionService>(UserSubscriptionService);
    userSubscriptionRepo = module.get(getRepositoryToken(UserSubscription));
    userRepo = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createSubscription', () => {
    it('should throw NotFoundException if user does not exist', async () => {
      userRepo.findOne.mockResolvedValue(null);
      await expect(
        service.createSubscription(1, new Date(), new Date()),
      ).rejects.toThrow(NotFoundException);
    });

    it('should create and save a subscription if user exists', async () => {
      userRepo.findOne.mockResolvedValue(mockUser);
      userSubscriptionRepo.save.mockResolvedValue(mockSubscription);

      const result = await service.createSubscription(1, mockSubscription.startDate, mockSubscription.endDate);

      expect(userRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(userSubscriptionRepo.save).toHaveBeenCalledWith(expect.objectContaining({
        idUser: 1,
        startDate: mockSubscription.startDate,
        endDate: mockSubscription.endDate,
        ongoing: true,
      }));
      expect(result).toEqual(mockSubscription);
    });
  });

  describe('getUserSubscriptions', () => {
    it('should return user subscriptions', async () => {
      userSubscriptionRepo.find.mockResolvedValue([mockSubscription]);
      const result = await service.getUserSubscriptions(1);
      expect(userSubscriptionRepo.find).toHaveBeenCalledWith({
        where: { idUser: 1 },
        relations: ['user'],
      });
      expect(result).toEqual([mockSubscription]);
    });
  });

  describe('cancelSubscription', () => {
    it('should throw NotFoundException if subscription does not exist', async () => {
      userSubscriptionRepo.findOne.mockResolvedValue(null);
      await expect(service.cancelSubscription(1)).rejects.toThrow(NotFoundException);
    });

    it('should set ongoing to false and save the subscription', async () => {
      userSubscriptionRepo.findOne.mockResolvedValue({ ...mockSubscription });
      userSubscriptionRepo.save.mockResolvedValue({ ...mockSubscription, ongoing: false });

      await service.cancelSubscription(1);

      expect(userSubscriptionRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(userSubscriptionRepo.save).toHaveBeenCalledWith(expect.objectContaining({
        id: 1,
        ongoing: false,
      }));
    });
  });
});