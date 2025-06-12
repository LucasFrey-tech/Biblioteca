import { Crud } from "../service";
import { BookContentDTO } from "../types/bookContent.dto";

export class BookContent extends Crud<BookContentDTO>{
    async getAll(): Promise<BookContentDTO[]> {
        throw new Error("Method not implemented.");
    }
    
    async getOne(id: number): Promise<BookContentDTO> {
        const resBook = await fetch(`http://localhost:3001/books/book/content/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return resBook.json();
    }
    
    create(data: Partial<BookContentDTO>): Promise<BookContentDTO> {
        throw new Error("Method not implemented.");
    }
    update(id: number, data: Partial<BookContentDTO>): Promise<BookContentDTO> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}