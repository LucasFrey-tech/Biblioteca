import { APIClient } from '../interface/apiClient';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
if (!BASE_URL) throw new Error('NEXT_PUBLIC_API_URL no está definida');

export abstract class BaseStrategy<T> implements APIClient<T> {
  constructor(protected endpoint: string, private token?: string) {}

  protected getHeaders(): HeadersInit {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  protected async fetchWrapper(url: string, options: RequestInit = {}): Promise<Response> {
    try {
      const res = await fetch(`${BASE_URL}/${this.endpoint}${url}`, {
        ...options,
        headers: { ...this.getHeaders(), ...options.headers },
      });
      if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
      return res;
    } catch (error) {
      throw new Error(`Error de red: ${error.message}`);
    }
  }

  async getAll(): Promise<T[]> {
    const res = await this.fetchWrapper('');
    return res.json();
  }

  async getOne(id: number): Promise<T> {
    const res = await this.fetchWrapper(`/${id}`);
    return res.json();
  }

  async create(data: Partial<T>): Promise<T> {
    const res = await this.fetchWrapper('', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    const res = await this.fetchWrapper(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async delete(id: number): Promise<void> {
    await this.fetchWrapper(`/${id}`, { method: 'DELETE' });
  }
}