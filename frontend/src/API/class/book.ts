import { Crud } from '../service';
import { Book } from '../types/book';
import { BookFile } from '../types/bookFile';


export class Books extends Crud<Book> {
    private endPoint: string;
    constructor(token?: string) {
        super(token);
        this.endPoint = 'books';
    }

    async getAll(): Promise<Book[]> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        return res.json();
    }

    async getOne(id: number): Promise<Book> {
        const response = await fetch(`${this.baseUrl}/${this.endPoint}/${id}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        return response.json();
    }

    async create(data: Partial<Book>): Promise<Book> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });
        return res.json();
    }

    async createBookFile(data: Partial<BookFile>, bookGenres: number[]): Promise<Book> {
        const formData = new FormData();
        formData.append("title", data.title + '');
        formData.append("author_id", data.author_id + '');
        formData.append("description", data.description + '');
        formData.append("anio", data.anio + '');
        formData.append("isbn", data.isbn + '');
        if (data.image && typeof data.image === 'object') {
            formData.append("image", data.image);
        } else if (data.image) {
            formData.append("image", new Blob([data.image], { type: 'image/jpeg' }));
        }
        formData.append("stock", data.stock + '');
        formData.append("subscriber_exclusive", data.subscriber_exclusive + '');
        formData.append("price", data.price + '');

        formData.append("genre", JSON.stringify(bookGenres));

        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'POST',
            // headers: {'Content-Type': 'multipart/form'},
            body: formData,
        });

        const book = await res.json();
        console.log('Book created', book);

        return book;
    }

    async update(id: number, data: Partial<Book>): Promise<Book> {

        const res = await fetch(`${this.baseUrl}/${this.endPoint}/${id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });
        return res.json();
    }

    async updateBookFile(id: number, data: Partial<BookFile>, bookGenres: number[]): Promise<Book> {
        const formData = new FormData();
        formData.append('id', id.toString());
        formData.append("title", data.title + '');

        formData.append("author_id", data.author_id?.toString() || '');
        formData.append("description", data.description + '');
        formData.append("anio", data.anio + '');
        formData.append("isbn", data.isbn + '');

        if (data.image && typeof data.image === 'object') {
            formData.append("image", data.image);
        } else if (data.image) {
            formData.append("image", new Blob([data.image], { type: 'image/jpeg' }));
        }

        formData.append("stock", data.stock + '');
        formData.append("subscriber_exclusive", data.subscriber_exclusive + '');
        formData.append("price", data.price + '');


        formData.append("genre", JSON.stringify(bookGenres));

        const res = await fetch(`${this.baseUrl}/${this.endPoint}/${id}`, {
            method: 'PUT',
            body: formData
        });

        if (!res.ok) {
            const error = await res.json();
            console.error("Update failed", error);
            throw new Error("Failed to update book");
        }

        const book = await res.json();
        return book;
    }

    async delete(id: number): Promise<void> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({ message: 'Error desconocido' }));
            throw new Error(error.message || 'Error al eliminar');
        }
    }

}