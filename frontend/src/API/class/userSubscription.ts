import { Crud, PaginatedResponse } from "../service";
import { UserSubscriptionDTO } from "../types/userSubscription";

export interface UserSubscriptionCreateInput {
  userId: number;
  startDate: string;  
  endDate: string;    
}

export interface UserSubscriptionUpdateInput {
  startDate?: string;
  endDate?: string;
  ongoing?: boolean;
}

export class UserSubscriptionAPI extends Crud<UserSubscriptionDTO> {
  getAllPaginated(page?: number, limit?: number): Promise<PaginatedResponse<UserSubscriptionDTO>> {
    throw new Error("Method not implemented.");
  }
  private endPoint: string;

  constructor(token?: string) {
    super(token);
    this.endPoint = "user-subscriptions";
  }

  async getAll(): Promise<UserSubscriptionDTO[]> {
    const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return res.json();
  }

  getOne(_id: number): Promise<UserSubscriptionDTO> {
    throw new Error("Method not implemented.");
  }

  delete(_id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getOneByUser(userId: number): Promise<UserSubscriptionDTO> {
  const res = await fetch(`${this.baseUrl}/${this.endPoint}/${userId}`, {
    method: 'GET',
    headers: this.getHeaders(),
  });

  if (!res.ok) {
    throw new Error('No subscription found');
  }

  return res.json();
}

  async create(data: UserSubscriptionCreateInput): Promise<UserSubscriptionDTO> {
    const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async update(id: number, data: UserSubscriptionUpdateInput): Promise<UserSubscriptionDTO> {
    const res = await fetch(`${this.baseUrl}/${this.endPoint}/${id}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  }
}
