import { Crud } from "../service";
import { Author } from "../types/author";

export class Authors extends Crud<Author> {
    private endPoint: string;
    constructor(token?: string) {
        super(token);
        this.endPoint = 'authors';
    }

    async getAll(): Promise<Author[]> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        return res.json();
    }

    async create(data: Partial<Author>): Promise<Author> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });
        return res.json();
    }

    getOne(id: number): Promise<Author> {
        throw new Error("Method not implemented.");
    }

    update(id: number, data: Partial<Author>): Promise<Author> {
        throw new Error("Method not implemented.");
    }

    async delete(id: number): Promise<void> {
        await fetch(`${this.baseUrl}/${this.endPoint}/${id}`, {method: 'DELETE', headers: this.getHeaders(),});
        
    }
}