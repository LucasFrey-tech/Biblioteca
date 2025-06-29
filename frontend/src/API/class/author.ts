import { Crud, PaginatedResponse } from "../service";
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
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Error al obtener autores (${res.status}): ${errorDetails}`);
        }
        const data = await res.json();
        if (!Array.isArray(data)) {
            throw new Error('Respuesta no es un arreglo de autores');
        }
        return data;
    }

    async getAllPaginated(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Author>> {
    const res = await fetch(`${this.baseUrl}/${this.endPoint}/paginated?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: this.getHeaders(),
    });
    if (!res.ok) {
        const errorDetails = await res.text();
        throw new Error(`Error al obtener autores paginados (${res.status}): ${errorDetails}`);
    }
    const data = await res.json();

    return {
        items: data.authors || [],
        total: data.total || 0
    };
}


    async create(data: Partial<Author>): Promise<Author> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Error al crear autor (${res.status}): ${errorDetails}`);
        }
        return res.json();
    }

    getOne(_id: number): Promise<Author> {
        throw new Error("Method not implemented.");
    }

    update(_id: number, _data: Partial<Author>): Promise<Author> {
        throw new Error("Method not implemented.");
    }

    async delete(id: number): Promise<void> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Error al eliminar autor (${res.status}): ${errorDetails}`);
        }
    }
}