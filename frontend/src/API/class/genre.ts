import { Crud } from "../service";
import { Genre } from "../types/genre";

export class Genres extends Crud<Genre> {
    private endPoint: string;
    constructor(token?: string) {
        super(token);
        this.endPoint = 'genres';
    }

    async getAll(): Promise<Genre[]> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        return res.json();
    }

    async create(data: Partial<Genre>): Promise<Genre>{
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });
        return res.json();
    }

    getOne(id: number): Promise<Genre> {
        throw new Error("Method not implemented.");
    }
    update(id: number, data: Partial<Genre>): Promise<Genre> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}