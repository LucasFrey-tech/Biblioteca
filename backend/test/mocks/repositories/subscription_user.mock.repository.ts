import { UserSubscription } from "src/entidades/subscription_user.entity";
import { mockUser1 } from "./users.repository.mock";
import { mockSubscription1 } from "./subscription.repository.mock";

export const mockUserSubscription1:UserSubscription = {
    id: 1,
    startDate: new Date("1890-05-02"),
    endDate: new Date("2029-05-02"),
    ongoing: true,
    user: mockUser1,
    subscription: mockSubscription1
};


export const mockUserSubscriptions = [mockUserSubscription1];

export const mockUserSubscriptionRepository = {
    find: jest.fn().mockResolvedValue(mockUserSubscriptions),
    findOne: jest.fn().mockResolvedValue(mockUserSubscription1),
    create: jest.fn().mockResolvedValue(mockUserSubscription1),
    update: jest.fn().mockResolvedValue(mockUserSubscription1),
    save: jest.fn().mockResolvedValue(mockUserSubscription1),
    delete: jest.fn().mockResolvedValue({ raw: {}, affected: 1 }),
  }