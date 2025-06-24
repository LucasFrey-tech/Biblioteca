import { SubscriptionDTO } from "../types/subscription";

export interface UserSubscriptionDiscountDTO {
  id?: number;
  id_subscription: number;
  discount: number;
  subscription?: SubscriptionDTO;
}