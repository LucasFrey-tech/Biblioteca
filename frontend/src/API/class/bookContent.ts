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
        const text = await resBook.text();
        if (!text) {
            return { id: 0, idBook: 0, content: "" } as BookContentDTO;
        }
        return JSON.parse(text);
    }
    
    async create(data: Partial<BookContentDTO>): Promise<BookContentDTO> {
        const formData = new FormData();
        formData.append("idBook", data.idBook + '');
        if (data.content instanceof File) {
            formData.append("content", data.content)
        }
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'POST',
            body: formData,
        });

        const content = await res.json();
        return content;
    }

    async update(id: number, data: Partial<BookContentDTO>): Promise<BookContentDTO> {
        const formData = new FormData();
        formData.append("idBook", data.idBook + '');
        if (data.content instanceof File) {
            formData.append("content", data.content);
        } else if (typeof data.content === 'string') {
            formData.append("existingImage", data.content)
        }
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/${id}`, {
            method: 'PUT',
            body: formData
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