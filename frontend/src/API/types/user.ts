export interface User {
  id: number;
  admin: boolean;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  tel?: number;
  disabled: boolean;
  userSubscriptions: UserSubscription[];
}
export interface UserSubscription {
  id: number;
  ongoing: boolean;
  startDate: string;
  endDate: string;
  price: number;
}