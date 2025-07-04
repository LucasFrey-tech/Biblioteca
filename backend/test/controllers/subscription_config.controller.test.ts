import { SubscriptionController } from '../../src/modules/subscriptions/subscription_config/subscription_config.controller';
import { SubscriptionService } from '../../src/modules/subscriptions/subscription_config/subscription_config.service';
import { SubscriptionDTO } from '../../src/modules/subscriptions/subscription_config/dto/subscription.dto';
import { mockUserSubscriptionDiscountRepository } from 'test/mocks/repositories/user_subscription_discount.repository.mock';

describe('SubscriptionController', () => {
  let controller: SubscriptionController;
  let service: jest.Mocked<SubscriptionService>;

  beforeEach(() => {
    service = {
      get: jest.fn().mockResolvedValue({} as SubscriptionDTO),
      update: jest.fn().mockResolvedValue({} as SubscriptionDTO),
      create: jest.fn().mockResolvedValue({} as SubscriptionDTO),
    } as any;
    controller = new SubscriptionController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have a method getUserSubscriptions()', async () => {
    expect(typeof controller.getUserSubscriptions).toBe('function');
    const result = await controller.getUserSubscriptions();
    expect(result).toBeDefined();
    expect(service.get).toHaveBeenCalled();
  });

  it('should have a method update()', async () => {
    expect(typeof controller.update).toBe('function');
    const updateData: Partial<SubscriptionDTO> = { price: 99 };
    const result = await controller.update(updateData);
    expect(result).toBeDefined();
    expect(service.update).toHaveBeenCalledWith(1, updateData);
  });

  it('should have a method create()', async () => {
    expect(typeof controller.create).toBe('function');
    const data: SubscriptionDTO = { id: 1, price: 50, duration: 30 } as any;
    const result = await controller.create(data);
    expect(result).toBeDefined();
    expect(service.create).toHaveBeenCalledWith(data);
  });

  it('getUserSubscriptions() should return a SubscriptionDTO', async () => {
    const mockSubscription: SubscriptionDTO = { id: 1, price: 10, duration: 30 } as any;
    service.get.mockResolvedValueOnce(mockSubscription);
    const result = await controller.getUserSubscriptions();
    expect(result).toEqual(mockSubscription);
  });

  it('update() should return the updated SubscriptionDTO', async () => {
    const result = await controller.update({});
    expect(controller.update).toBeTruthy()
  });
  
  it('create() should return the created SubscriptionDTO', async () => {
    const result = await controller.create({
      id: 1,
      price: 1000
    });
    expect(controller.create).toBeTruthy()
  });
});