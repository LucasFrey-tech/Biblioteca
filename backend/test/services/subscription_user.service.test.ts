import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../src/entidades/user.entity';
import { UserSubscription } from '../../src/entidades/subscription_user.entity';
import { UserSubscriptionService } from '../../src/modules/subscriptions/users_subscriptions/subscription_user.service';
import { mockUserSubscription1, mockUserSubscriptions } from '../mocks/entities/subscription_user.mock';
import { Subscription } from '../../src/entidades/subscription.entity';
import { mockNewUser, mockUpdatedUser, mockUser1, mockUsers } from '../mocks/entities/user.mock';
import { mockSubscription1, mockSubscriptions } from '../mocks/entities/subscription.mock';

describe('UserSubscriptionService', () => {
  let service: UserSubscriptionService;

  const mockUserSubscriptionRepository = {
    find: jest.fn().mockResolvedValue(mockUserSubscriptions),
    findOne: jest.fn().mockResolvedValue(mockUserSubscription1),
    create: jest.fn().mockResolvedValue(mockUserSubscription1),
    update: jest.fn().mockResolvedValue(mockUserSubscription1),
    save: jest.fn().mockResolvedValue(mockUserSubscription1),
    delete: jest.fn().mockResolvedValue({ raw: {}, affected: 1 }),
  }

  const mockUsersRepository = {
    find: jest.fn().mockResolvedValue(mockUsers),
    findOne: jest.fn().mockResolvedValue(mockUser1),
  }

  const mockSubscriptionRepository = {
    find: jest.fn().mockResolvedValue(mockSubscriptions),
    findOne: jest.fn().mockResolvedValue(mockSubscription1),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserSubscriptionService,
        {
          provide: getRepositoryToken(UserSubscription),
          useValue: mockUserSubscriptionRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
        {
          provide: getRepositoryToken(Subscription),
          useValue: mockSubscriptionRepository,
        },
      ],
    }).compile();

    service = module.get<UserSubscriptionService>(UserSubscriptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createSubscription', () => {
    it('should throw NotFoundException if user does not exist', async () => {
      // Arrange: mock findOne to return undefined for this test
      (mockUsersRepository.findOne as jest.Mock).mockResolvedValueOnce(undefined);
      await expect(
        service.createSubscription(1, new Date(), new Date()),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if subscription config does not exist', async () => {
      // Arrange: mock subscription repository to return undefined for this test
      (mockSubscriptionRepository.findOne as jest.Mock).mockResolvedValueOnce(undefined);
      await expect(
        service.createSubscription(1, new Date(), new Date()),
      ).rejects.toThrow(NotFoundException);
    });

    it('should create and save a subscription if user and config exist', async () => {
      const startDate = new Date();
      const endDate = new Date();
      const result = await service.createSubscription(1, startDate, endDate);

      expect(result).toHaveProperty('id', 1);
    });
  });

  describe('getUserSubscription', () => {
    it('should throw NotFoundException if user subscription does not exist', async () => {
      // Arrange: mock findOne to return undefined for this test
      (mockUserSubscriptionRepository.findOne as jest.Mock).mockResolvedValueOnce(undefined);
      await expect(service.getUserSubscription(1)).rejects.toThrow(NotFoundException);
    });

    it('should return UserSubscriptionDTO if found', async () => {
      const result = await service.getUserSubscription(1);
      expect(result).toEqual({
        id: 1,
        startDate: mockUserSubscription1.startDate.toISOString(),
        endDate: mockUserSubscription1.endDate.toISOString(),
        ongoing: mockUserSubscription1.ongoing,
        subscription: { id: mockSubscription1.id, price: mockSubscription1.price },
      });
    });
  });

  describe('getUserSubscriptions', () => {
    it('should return user subscriptions', async () => {
      const result = await service.getUserSubscriptions();
      expect(result).toEqual([{
        id: mockUserSubscription1.id,
        startDate: mockUserSubscription1.startDate.toISOString(),
        endDate: mockUserSubscription1.endDate.toISOString(),
        ongoing: mockUserSubscription1.ongoing,
        subscription: { id: mockSubscription1.id, price: mockSubscription1.price },
      }]);
    });

    it('should return empty array if no subscriptions', async () => {
      (mockUserSubscriptionRepository.find as jest.Mock).mockResolvedValueOnce([]);
      const result = await service.getUserSubscriptions();
      expect(result).toEqual([]);
    });
  });

  describe('cancelSubscription', () => {
    it('should throw NotFoundException if subscription does not exist', async () => {
      // Arrange: mock findOne to return undefined for this test
      (mockUserSubscriptionRepository.findOne as jest.Mock).mockResolvedValueOnce(undefined);
      await expect(service.cancelSubscription(1)).rejects.toThrow(NotFoundException);
    });

    it('should set ongoing to false and save the subscription', async () => {
      await service.cancelSubscription(1);
      expect(mockUserSubscriptionRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ ongoing: false })
      );
    });
  });
});

