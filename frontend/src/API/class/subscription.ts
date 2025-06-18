import { Crud } from "../service";
import { SubscriptionDTO } from "../types/subscription";

export class Subscription extends Crud<SubscriptionDTO> {
    
    private endPoint: string;
    constructor(token?: string) {
        super(token)
        this.endPoint = 'reviews';
    }

    async getOne(): Promise<SubscriptionDTO> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        return res.json();
    }

    async update(id: number, data: Partial<SubscriptionDTO>): Promise<SubscriptionDTO> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });
        return res.json();
    }

    getAll(): Promise<SubscriptionDTO[]> {
        throw new Error("Method not implemented.");
    }
    create(data: Partial<SubscriptionDTO>): Promise<SubscriptionDTO> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}