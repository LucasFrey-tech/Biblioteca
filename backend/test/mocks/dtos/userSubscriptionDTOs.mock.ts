import { UserSubscriptionDTO } from "../../../src/modules/subscriptions/users_subscriptions/user_subscription.dto";
import { mockDtoSubscription1 } from "./subscriptionConfigDTO.mock";

export const mockDtoUserSubscription1:UserSubscriptionDTO = {
    id: 1,
    startDate: "20250612",
    endDate: "20250613",
    ongoing: true,
    subscription: mockDtoSubscription1
};

export const mockDtoUserSubscription2:UserSubscriptionDTO = {
    id: 2,
    startDate: "19920612",
    endDate: "19920613",
    ongoing: false,
    subscription: mockDtoSubscription1
};

export const mockDtoUserSubscription3:UserSubscriptionDTO = {
    id: 3,
    startDate: "20250612",
    endDate: "20290613",
    ongoing: true,
    subscription: mockDtoSubscription1
};
