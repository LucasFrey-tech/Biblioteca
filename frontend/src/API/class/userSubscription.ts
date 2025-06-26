import { Crud } from "../service";
import { UserSubscriptionDTO } from "../types/userSubscription";

export class UserSubscriptionAPI extends Crud<UserSubscriptionDTO> {
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
  private endPoint: string;

  constructor(token?: string) {
    super(token);
    this.endPoint = "user-subscriptions";
  }

async getOneByUser(userId: number): Promise<UserSubscriptionDTO> {
  console.log(`Fetching subscription for user ID: ${userId}`);
  const res = await fetch(`${this.baseUrl}/${this.endPoint}/${userId}`, {
    method: 'GET',
    headers: this.getHeaders(),
  });
  return res.json();
}

  async create(data: UserSubscriptionDTO): Promise<UserSubscriptionDTO> {
    const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async update(id: number, data: Partial<UserSubscriptionDTO>): Promise<UserSubscriptionDTO> {
    const res = await fetch(`${this.baseUrl}/${this.endPoint}/${id}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  }
}

