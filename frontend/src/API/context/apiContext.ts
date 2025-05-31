import { APIClient } from "../interface/apiClient";

export class APIContext<T> {
  constructor(private strategy: APIClient<T>) {}

  setStrategy(strategy: APIClient<T>) {
    this.strategy = strategy;
  }

  getAll(): Promise<T[]> {
    return this.strategy.getAll();
  }

  getOne(id: number): Promise<T> {
    return this.strategy.getOne(id);
  }

  create(data: Partial<T>): Promise<T> {
    return this.strategy.create(data);
  }

  update(id: number, data: Partial<T>): Promise<T>{
    return this.strategy.update(id, data);
  }

}