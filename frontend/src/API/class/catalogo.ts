import { Crud, PaginatedResponse } from "../service";
import { BookCatalogo } from "../types/bookCatalogo";

export class Catalogo extends Crud<BookCatalogo> {
    private endPoint: string;
    constructor(token?: string) {
        super(token);
        this.endPoint = 'catalogue_books';
    }

    async getAll(): Promise<BookCatalogo[]> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Error al obtener libros del catálogo (${res.status}): ${errorDetails}`);
        }
        const data = await res.json();
        if (!Array.isArray(data)) {
            throw new Error('Respuesta no es un arreglo de libros del catálogo');
        }
        return data;
    }

    async getAllPaginated(page: number = 1, limit: number = 10): Promise<PaginatedResponse<BookCatalogo>> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/paginated?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Error al obtener libros del catálogo paginados (${res.status}): ${errorDetails}`);
        }
        return res.json();
    }
    
    getOne(_id: number): Promise<BookCatalogo> {
        throw new Error("Method not implemented.");
    }
    create(_data: Partial<BookCatalogo>): Promise<BookCatalogo> {
        throw new Error("Method not implemented.");
    }
    update(_id: number, _data: Partial<BookCatalogo>): Promise<BookCatalogo> {
        throw new Error("Method not implemented.");
    }
    delete(_id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}