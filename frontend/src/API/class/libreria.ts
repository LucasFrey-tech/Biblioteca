import { Crud } from "../service";
import { BookLibreria } from "../types/libreria";

export class Libreria extends Crud<BookLibreria> {
    private endPoint: string;
    constructor(token?: string) {
        super(token);
        this.endPoint = 'library_books';
    }

    async getAll(): Promise<BookLibreria[]> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        return res.json();
    }

    getOne(id: number): Promise<BookLibreria> {
        throw new Error("Method not implemented.");
    }
    create(data: Partial<BookLibreria>): Promise<BookLibreria> {
        throw new Error("Method not implemented.");
    }
    update(id: number, data: Partial<BookLibreria>): Promise<BookLibreria> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}