import { Crud, PaginatedResponse } from "../service";
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
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Error al obtener géneros (${res.status}): ${errorDetails}`);
        }
        const data = await res.json();
        if (!Array.isArray(data)) {
            throw new Error('Respuesta no es un arreglo de géneros');
        }
        return data;
    }

    async getAllPaginated(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Genre>> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/paginated?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Error al obtener géneros paginados (${res.status}): ${errorDetails}`);
        }
        return res.json();
    }

    async create(data: Partial<Genre>): Promise<Genre> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Error al crear género (${res.status}): ${errorDetails}`);
        }
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
            const errorDetails = await res.text();
            throw new Error(`Error al eliminar género (${res.status}): ${errorDetails}`);
        }
    }
}