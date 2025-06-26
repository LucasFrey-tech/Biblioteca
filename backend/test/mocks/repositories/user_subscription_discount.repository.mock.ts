import { UserSubscriptionDiscount } from "../../../src/entidades/user_subscription_discount.entity";
import { mockSubscription1 } from "./subscription.repository.mock";

export const mockUserSubscriptionDiscount1:UserSubscriptionDiscount = {
    id: 1,
    discount: 0.7,
    subscription: mockSubscription1
};


export const mockUserSubscriptionDiscounts = [mockUserSubscriptionDiscount1];

export const mockUserSubscriptionDiscountRepository = {
    find: jest.fn().mockResolvedValue(mockUserSubscriptionDiscount1),
    findOne: jest.fn().mockResolvedValue(mockUserSubscriptionDiscounts),
    create: jest.fn().mockResolvedValue(mockUserSubscriptionDiscount1),
    update: jest.fn().mockResolvedValue(mockUserSubscriptionDiscount1), 
    save: jest.fn().mockResolvedValue(mockUserSubscriptionDiscount1),
    delete: jest.fn().mockResolvedValue({raw: {}, affected: 1 }) ,
  }