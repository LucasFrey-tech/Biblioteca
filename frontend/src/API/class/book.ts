
import { Crud } from '../service';
import { Book } from '../types/book';
import { BookFile, BookFileUpdate } from '../types/bookFile';
import { BookGenres } from '@/API/class/book_genre';
// import BookGenres from '@/API/class/book_genre'


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

    async create(data: Partial<Book>): Promise<Book>{
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });
        return res.json();
    }

    async createBookFile(data: Partial<BookFile>): Promise<Book>{
        const formData = new FormData();
        formData.append("title", data.title + '');
        formData.append("author", data.author + '');
        formData.append("author_id", data.author_id + '');
        formData.append("description", data.description + '');
        data.genre?.forEach((genre: string) => {
            formData.append("genre", genre);});
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
        formData.append("virtual", data.virtual + '');

        console.log('Generos:', data.genre);
        for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
        }
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'POST',
            // headers: {'Content-Type': 'multipart/form'},
            body: formData,
        });

        const book = await res.json();
        const var22 = new BookGenres();
        
        data.genre?.forEach(async (genre: string) => {
            console.log('Creating book genre:', genre);
            // SACAR EL ENDPOINT HARDODEADO 
            // await fetch(`${this.baseUrl}/${endPoint2}`, {
            // method: 'POST',
            // // headers: {'Content-Type': 'multipart/form'},
            // body: JSON.stringify({name: genre, id_book: book.id}),
        // });
            var22.create({name: genre, id_book: book.id});
        });

        return book;
    }

    async update(id: number, data: Partial<Book>): Promise<Book> {
        
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/${id}`,{
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });
        return res.json();
    }
    async updateBookFile(id: number, data: Partial<BookFileUpdate>): Promise<Book> {
        const formData = new FormData();
        formData.append("title", data.title + '');
        formData.append("author", data.author + '');
        formData.append("author_id", data.author_id + '');
        formData.append("description", data.description + '');
        console.log('Creating book file with data:', data);
        formData.append("genre", JSON.stringify(data.genre));
        formData.append("anio", data.anio + '');
        formData.append("isbn", data.isbn + '');
        if (data.image instanceof File) {
            formData.append("image", data.image);
            }
        formData.append("stock", data.stock + '');
        formData.append("subscriber_exclusive", data.subscriber_exclusive + '');
        formData.append("price", data.price + '');
        for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
        }
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/${id}`,{
            method: 'PUT',
            // headers: this.getHeaders(),
            body: formData,
        });
        return res.json();
    }

    async delete(id: number): Promise<void> {
        await fetch(`${this.baseUrl}/${this.endPoint}/${id}`, {method: 'DELETE', headers: this.getHeaders(),});
        
    }
}