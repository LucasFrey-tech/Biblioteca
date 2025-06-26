import { UserSubscriptionController } from '../../src/modules/subscriptions/users_subscriptions/subscription_user.controller';
import { UserSubscriptionService } from '../../src/modules/subscriptions/users_subscriptions/subscription_user.service';
import { UserSubscriptionDTO } from '../../src/modules/subscriptions/users_subscriptions/user_subscription.dto';
import { UserSubscription } from '../../src/entidades/subscription_user.entity';

describe('UserSubscriptionController', () => {
  let controller: UserSubscriptionController;
  let service: jest.Mocked<UserSubscriptionService>;

  beforeEach(() => {
    service = {
      createSubscription: jest.fn().mockResolvedValue({} as UserSubscription),
      getUserSubscription: jest.fn().mockResolvedValue({} as UserSubscriptionDTO),
      getUserSubscriptions: jest.fn().mockResolvedValue([]),
      cancelSubscription: jest.fn().mockResolvedValue(undefined),
    } as any;
    controller = new UserSubscriptionController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have a method createSubscription()', async () => {
    expect(typeof controller.createSubscription).toBe('function');
    const userId = 1;
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-12-31');
    const result = await controller.createSubscription(userId, startDate, endDate);
    expect(result).toBeDefined();
    expect(service.createSubscription).toHaveBeenCalledWith(userId, startDate, endDate);
  });

  it('should have a method getUserSubscription()', async () => {
    expect(typeof controller.getUserSubscription).toBe('function');
    const userId = 2;
    const result = await controller.getUserSubscription(userId);
    expect(result).toBeDefined();
    expect(service.getUserSubscription).toHaveBeenCalledWith(userId);
  });

  it('should have a method getUserSubscriptions()', async () => {
    expect(typeof controller.getUserSubscriptions).toBe('function');
    const result = await controller.getUserSubscriptions();
    expect(Array.isArray(result)).toBe(true);
    expect(service.getUserSubscriptions).toHaveBeenCalled();
  });

  it('should have a method cancelSubscription()', async () => {
    expect(typeof controller.cancelSubscription).toBe('function');
    const id = 3;
    await controller.cancelSubscription(id);
    expect(service.cancelSubscription).toHaveBeenCalledWith(id);
  });

  it('getUserSubscription() should return a UserSubscriptionDTO', async () => {
    const mockDto: UserSubscriptionDTO = { id: 1, userId: 1, startDate: new Date(), endDate: new Date() } as any;
    service.getUserSubscription.mockResolvedValueOnce(mockDto);
    const result = await controller.getUserSubscription(1);
    expect(result).toEqual(mockDto);
  });

  it('getUserSubscriptions() should return an array of UserSubscriptionDTO', async () => {
    const mockList: UserSubscriptionDTO[] = [
      { id: 1, userId: 1, startDate: new Date(), endDate: new Date() } as any,
      { id: 2, userId: 2, startDate: new Date(), endDate: new Date() } as any,
    ];
    service.getUserSubscriptions.mockResolvedValueOnce(mockList);
    const result = await controller.getUserSubscriptions();
    expect(result).toEqual(mockList);
  });

  it('cancelSubscription() should resolve without error', async () => {
    await expect(controller.cancelSubscription(10)).resolves.toBeUndefined();
  });
});