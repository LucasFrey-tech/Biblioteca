import { SubscriptionDTO } from "../../subscription_config/dto/subscription.dto";

export class UserSubscriptionDTO {
  id: number;
  startDate: string;
  endDate: string;
  ongoing: boolean;
  subscription: SubscriptionDTO | null; 
}
