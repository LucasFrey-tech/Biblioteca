import { UserSubscriptionDiscount } from "../../../src/entidades/user_subscription_discount.entity";
import { mockSubscription1 } from "./subscription.repository.mock";

export const mockSubscriptionBookDiscount1:UserSubscriptionDiscount = {
    id: 1,
    discount: 0.7,
    subscription: mockSubscription1
};


export const mockSubscriptionBookDiscounts = [mockSubscriptionBookDiscount1];