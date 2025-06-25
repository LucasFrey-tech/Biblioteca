import { UserSubscriptionDiscountController } from '../../src/modules/subscriptions/subscription_discount/user_subscription_discount.controller';
import { UserSubscriptionDiscountService } from '../../src/modules/subscriptions/subscription_discount/user_subscription_discount.service';
import { UserSubscriptionDiscount } from '../../src/entidades/user_subscription_discount.entity';

describe('UserSubscriptionDiscountController', () => {
  let controller: UserSubscriptionDiscountController;
  let service: jest.Mocked<UserSubscriptionDiscountService>;

  beforeEach(() => {
    service = {
      create: jest.fn().mockResolvedValue({} as UserSubscriptionDiscount),
      findAll: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockResolvedValue({} as UserSubscriptionDiscount),
      update: jest.fn().mockResolvedValue({} as UserSubscriptionDiscount),
      delete: jest.fn().mockResolvedValue(undefined),
    } as any;
    controller = new UserSubscriptionDiscountController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have a method create()', async () => {
    expect(typeof controller.create).toBe('function');
    const data = { id_subscription: 1, discount: 20 };
    const result = await controller.create(data);
    expect(result).toBeDefined();
    expect(service.create).toHaveBeenCalledWith(data);
  });

  it('should have a method findAll()', async () => {
    expect(typeof controller.findAll).toBe('function');
    const result = await controller.findAll();
    expect(Array.isArray(result)).toBe(true);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should have a method findOne()', async () => {
    expect(typeof controller.findOne).toBe('function');
    const id = 1;
    const result = await controller.findOne(id);
    expect(result).toBeDefined();
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('should have a method update()', async () => {
    expect(typeof controller.update).toBe('function');
    const id = 1;
    const data = { discount: 30 };
    const result = await controller.update(id, data);
    expect(result).toBeDefined();
    expect(service.update).toHaveBeenCalledWith(id, data);
  });

  it('should have a method delete()', async () => {
    expect(typeof controller.delete).toBe('function');
    const id = 1;
    await expect(controller.delete(id)).resolves.toBeUndefined();
    expect(service.delete).toHaveBeenCalledWith(id);
  });

  it('findAll() should return an array of UserSubscriptionDiscount', async () => {
    const mockDiscounts: UserSubscriptionDiscount[] = [
      { id: 1, id_subscription: 1, discount: 10 } as any,
      { id: 2, id_subscription: 2, discount: 15 } as any,
    ];
    service.findAll.mockResolvedValueOnce(mockDiscounts);
    const result = await controller.findAll();
    expect(result).toEqual(mockDiscounts);
  });

  it('findOne() should return a UserSubscriptionDiscount for existing id', async () => {
    const mockDiscount: UserSubscriptionDiscount = { id: 1, id_subscription: 1, discount: 10 } as any;
    service.findOne.mockResolvedValueOnce(mockDiscount);
    const result = await controller.findOne(1);
    expect(result).toEqual(mockDiscount);
  });

  it('update() should return the updated UserSubscriptionDiscount', async () => {
    const updated: UserSubscriptionDiscount = { id: 1, id_subscription: 1, discount: 25 } as any;
    service.update.mockResolvedValueOnce(updated);
    const result = await controller.update(1, { discount: 25 });
    expect(result).toEqual(updated);
  });
});