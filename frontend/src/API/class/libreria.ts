import { Crud, PaginatedResponse } from "../service";
import { BookLibreria } from "../types/libreria";

export class Libreria extends Crud<BookLibreria> {
    private endPoint: string;
    constructor(token?: string) {
        super(token);
        this.endPoint = 'library_books';
    }

    async getAllPaginated(userId: number, page: number = 1, limit: number = 10): Promise<PaginatedResponse<BookLibreria>> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/${userId}/paginated?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Error al obtener libros de la biblioteca paginados (${res.status}): ${errorDetails}`);
        }
        return res.json();
    }

    async findAllByUser(userId: number): Promise<BookLibreria[]> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/${userId}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Error al obtener libros de la biblioteca (${res.status}): ${errorDetails}`);
        }
        const data = await res.json();
        if (!Array.isArray(data)) {
            throw new Error('Respuesta no es un arreglo de libros de la biblioteca');
        }
        return data;
    }

    async create(data: Partial<BookLibreria>): Promise<BookLibreria> {
        if (data.idUser === undefined || data.idBook === undefined) {
            throw new Error('idUser and idBook are required');
        }

        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({
                idUser: data.idUser,
                idBook: data.idBook
            })
        });

        if (!res.ok) {
            let errorDetails = res.statusText;
            try {
                const errorBody = await res.json();
                if (errorBody.message) {
                    errorDetails = errorBody.message;
                }
            } catch (e) {
                console.error('Error parsing error response:', e);
            }
            throw new Error(`Error al agregar libro a la biblioteca (${res.status}): ${errorDetails}`);
        }

        return res.json();
    }

    getAll(): Promise<BookLibreria[]> {
        throw new Error("Method not implemented.");
    }
    getOne(_id: number): Promise<BookLibreria> {
        throw new Error("Method not implemented.");
    }
    update(_id: number, _data: Partial<BookLibreria>): Promise<BookLibreria> {
        throw new Error("Method not implemented.");
    }
    delete(_id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}