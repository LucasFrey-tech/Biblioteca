import { Crud, PaginatedResponse } from "../service";
import { SubscriptionDTO } from "../types/subscription";

export class Subscription extends Crud<SubscriptionDTO> {
  getAllPaginated(page?: number, limit?: number): Promise<PaginatedResponse<SubscriptionDTO>> {
    throw new Error("Method not implemented.");
  }
  private endPoint: string;
  constructor(token?: string) {
    super(token);
    this.endPoint = 'subscriptions';
  }

  async getOne(): Promise<SubscriptionDTO> {
    const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return res.json();
  }

    async update(_id: number, data: Partial<SubscriptionDTO>): Promise<SubscriptionDTO> {
      const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Error updating subscription');
      }

      return res.json();
    }
  getAll(): Promise<SubscriptionDTO[]> {
    throw new Error("Method not implemented.");
  }

  async create(data: Partial<SubscriptionDTO>): Promise<SubscriptionDTO> {
    const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Error creating subscription');
    }

  return res.json();
}
  delete(_id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
