import { UserSubscription } from "src/entidades/subscription_user.entity";
import { mockUser1 } from "./user.mock";
import { mockSubscription1 } from "./subscription.mock";

export const mockUserSubscription1:UserSubscription = {
    id: 1,
    startDate: new Date("1890-05-02"),
    endDate: new Date("2029-05-02"),
    ongoing: true,
    user: mockUser1,
    subscription: mockSubscription1
};


export const mockUserSubscriptions = [mockUserSubscription1];