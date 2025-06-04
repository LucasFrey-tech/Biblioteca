import { Crud } from '../service';
import { Book } from '../types/book';

export class Books extends Crud<Book> {
    private endPoint: string;
    constructor(token?: string) {
        super(token);
        this.endPoint = 'books';
    }

    async getAll(): Promise<Book[]> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        return res.json();
    }

    async getOne(id: number): Promise<Book> {
        const response = await fetch(`${this.baseUrl}/${this.endPoint}/${id}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        return response.json();
    }

    async create(data: Partial<Book>): Promise<Book>{
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });
        return res.json();
    }

    async update(id: number, data: Partial<Book>): Promise<Book> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/${id}`,{
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });
        return res.json();
    }

    async delete(id: number): Promise<void> {
        await fetch(`${this.baseUrl}/${this.endPoint}/${id}`, {method: 'DELETE', headers: this.getHeaders(),});
        
    }
}