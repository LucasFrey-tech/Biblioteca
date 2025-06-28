import { Crud, PaginatedResponse } from "../service";
import { Review } from "../types/review";

export class Reviews extends Crud<Review> {
    private endPoint: string;

    constructor(token?: string) {
        super(token);
        this.endPoint = 'reviews';
    }

    async getAllPaginated(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Review>> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/paginated?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Error al obtener reseñas paginadas (${res.status}): ${errorDetails}`);
        }
        const data = await res.json();
        return {
            items: data.items,
            total: data.total
        };
    }

    async getAll(): Promise<Review[]> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Error al obtener reseñas (${res.status}): ${errorDetails}`);
        }
        const data = await res.json();
        if (!Array.isArray(data)) {
            throw new Error('Respuesta no es un arreglo de reseñas');
        }
        return data;
    }

    async getOne(id: number): Promise<Review> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/${id}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Error al obtener reseña (${res.status}): ${errorDetails}`);
        }
        const data = await res.json();
        return data;
    }

    async getByBookId(bookId: number): Promise<Review[]> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/book/${bookId}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Error al obtener reseñas del libro ${bookId} (${res.status}): ${errorDetails}`);
        }
        const data = await res.json();
        if (!Array.isArray(data)) {
            throw new Error('Respuesta no es un arreglo de reseñas');
        }
        return data;
    }

    async create(data: Partial<Review>): Promise<Review> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Error al crear reseña (${res.status}): ${errorDetails}`);
        }
        const result = await res.json();
        return result;
    }

    async update(id: number, data: Partial<Review>): Promise<Review> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/${id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Error al actualizar reseña (${res.status}): ${errorDetails}`);
        }
        const result = await res.json();
        return result;
    }

    async delete(id: number): Promise<void> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Error al eliminar reseña (${res.status}): ${errorDetails}`);
        }
    }
}