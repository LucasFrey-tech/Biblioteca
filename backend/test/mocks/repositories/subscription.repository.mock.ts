import { Subscription } from "src/entidades/subscription.entity";

export const mockSubscription1:Subscription = {
    id: 1,
    price: 15000,
    userSubscriptions: []
};


export const mockSubscriptions = [mockSubscription1];

export const mockSubscriptionRepository = {
    find: jest.fn().mockResolvedValue(mockSubscriptions),
    findOne: jest.fn().mockResolvedValue(mockSubscription1),
    update: jest.fn().mockResolvedValue(mockSubscription1),
    save: jest.fn().mockResolvedValue(mockSubscription1),
    create: jest.fn().mockResolvedValue(mockSubscription1),
  }