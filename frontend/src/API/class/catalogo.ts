import { Crud } from "../service";
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
        return res.json();
    }
    
    getOne(id: number): Promise<BookCatalogo> {
        throw new Error("Method not implemented.");
    }
    create(data: Partial<BookCatalogo>): Promise<BookCatalogo> {
        throw new Error("Method not implemented.");
    }
    update(id: number, data: Partial<BookCatalogo>): Promise<BookCatalogo> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}