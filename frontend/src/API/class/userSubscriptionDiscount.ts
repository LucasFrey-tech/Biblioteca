import { Crud, PaginatedResponse } from "../service";
import { UserSubscriptionDiscountDTO } from "../types/userSubscriptionDiscount";

export class UserSubscriptionDiscount extends Crud<UserSubscriptionDiscountDTO> {
  getAllPaginated(page?: number, limit?: number): Promise<PaginatedResponse<UserSubscriptionDiscountDTO>> {
    throw new Error("Method not implemented.");
  }
  private endPoint: string;

  constructor(token?: string) {
    super(token);
    this.endPoint = 'user-subscription-discount';
  }

  async getOne(id: number): Promise<UserSubscriptionDiscountDTO> {
    const res = await fetch(`${this.baseUrl}/${this.endPoint}/${id}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Error fetching discount');
    }
    return res.json();
  }

  async getAll(): Promise<UserSubscriptionDiscountDTO[]> {
    const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Error fetching discounts');
    }
    return res.json();
  }

  async create(data: Partial<UserSubscriptionDiscountDTO>): Promise<UserSubscriptionDiscountDTO> {
    const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Error creating discount');
    }
    return res.json();
  }

  async update(id: number, data: Partial<UserSubscriptionDiscountDTO>): Promise<UserSubscriptionDiscountDTO> {
    const res = await fetch(`${this.baseUrl}/${this.endPoint}/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Error updating discount');
    }
    return res.json();
  }

  async delete(id: number): Promise<void> {
    const res = await fetch(`${this.baseUrl}/${this.endPoint}/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Error deleting discount');
    }
  }
}