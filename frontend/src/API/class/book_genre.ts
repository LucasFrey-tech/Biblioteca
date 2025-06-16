import { Crud } from "../service";
import { BookGenre } from "../types/book_genre";

export class BookGenres extends Crud<BookGenre> {
    private endPoint: string;

    constructor(token?: string) {
        super(token);
        this.endPoint = 'book_genres';
    }

    async findAll(): Promise<BookGenre[]> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        return res.json();
    }

     async create(data: Partial<BookGenre>): Promise<BookGenre> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        })
        return res.json();
    }

    getAll(): Promise<BookGenre[]> {
        throw new Error("Method not implemented.");
    }
    getOne(_id: number): Promise<BookGenre> {
        throw new Error("Method not implemented.");
    }
    update(_id: number, data: Partial<BookGenre>): Promise<BookGenre> {
        throw new Error("Method not implemented.");
    }
    delete(_id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}