import { UserSubscription } from "src/entidades/subscription_user.entity";

export const mockUserSubscription1:UserSubscription = {
    id: 1,
    idUser:  1,
    startDate: new Date("1890-05-02"),
    endDate:  new Date("2029-05-02"),
    ongoing:  true
};


export const mockUserSubscriptions = [mockUserSubscription1];