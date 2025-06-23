import { Crud } from "../service";
import { BookContentDTO } from "../types/bookContent.dto";

export class BookContent extends Crud<BookContentDTO>{
    private endPoint: string;
    constructor(token?: string) {
        super(token);
        this.endPoint = 'book/content';
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
        const formData = new FormData();
        if (data.content instanceof File) {
            formData.append("content", data.content)
        }

        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'POST',
            // headers: {'Content-Type': 'multipart/form'},
            body: formData,
        });

        const content = await res.json();
        console.log('Content uploaded.');

        return content;
    }

    async update(id: number, data: Partial<BookContentDTO>): Promise<BookContentDTO> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });
        return res.json();
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