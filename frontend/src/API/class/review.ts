import { Crud } from "../service";
import { Review } from "../types/review";

export class Reviews extends Crud<Review> {
    private endPoint: string;
    constructor(token?: string) {
        super(token)
        this.endPoint = 'reviews';
    }

    async getAll(): Promise<Review[]> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        return res.json();
    }

    async getOne(id: number): Promise<Review> {
        const response = await fetch(`${this.baseUrl}/${this.endPoint}/${id}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        return response.json();
    }

    async getByBookId(bookId: number): Promise<Review[]> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/book/${bookId}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        if (!res.ok) {
            throw new Error(`Error al obtener reviews del libro ${bookId}`);
        }

        return res.json();
    }

    async create(data: Partial<Review>): Promise<Review> {
        console.log(data);
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });
        return res.json();
    }

    async update(id: number, data: Partial<Review>): Promise<Review> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/${id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });
        return res.json();
    }

    async delete(id: number): Promise<void> {
        await fetch(`${this.baseUrl}/${this.endPoint}/${id}`, { method: 'DELETE', headers: this.getHeaders(), });

    }
}