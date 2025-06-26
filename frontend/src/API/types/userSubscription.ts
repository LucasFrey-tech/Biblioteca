import { SubscriptionDTO } from "../types/subscription";

export interface UserSubscriptionDTO {
  id?: number;
  startDate: string;
  endDate: string;
  ongoing: boolean;
  user: number; 
  subscription: SubscriptionDTO; 
}


