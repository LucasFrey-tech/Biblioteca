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

    async create(data: Partial<Genre>): Promise<Genre> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });
        return res.json();
    }

    getOne(_id: number): Promise<Genre> {
        throw new Error("Method not implemented.");
    }
    update(_id: number, _data: Partial<Genre>): Promise<Genre> {
        throw new Error("Method not implemented.");
    }

    async delete(id: number): Promise<void> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });

        if (!res.ok) {
            throw new Error(`Error al eliminar el género con id ${id}`);
        }
        
        return;
    }

}
