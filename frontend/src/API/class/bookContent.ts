import { Crud } from "../service";
import { BookContentDTO } from "../types/bookContent.dto";

export class BookContent extends Crud<BookContentDTO>{
    private endPoint: string;
    constructor(token?: string) {
        super(token);
        this.endPoint = '/book/content';
    }

    async getAll(): Promise<BookContentDTO[]> {
        throw new Error("Method not implemented.");
    }
    
    async getOne(id: number): Promise<BookContentDTO> {
        const resBook = await fetch(`${this.baseUrl}/${this.endPoint}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return resBook.json();
    }
    
    async create(data: Partial<BookContentDTO>): Promise<BookContentDTO> {
        const resBook = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });
        return resBook.json();
    }
    async update(id: number, data: Partial<BookContentDTO>): Promise<BookContentDTO> {
        const resBook = await fetch(`${this.baseUrl}/${this.endPoint}/${id}`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });
        return resBook.json();
    }
    async delete(id: number): Promise<void> {
        const resBook = await fetch(`${this.baseUrl}/${this.endPoint}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return resBook.json();
    }

}