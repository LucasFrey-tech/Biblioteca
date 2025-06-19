import { Crud } from '../service';
import { Book } from '../types/book';
import { BookFile, BookFileUpdate } from '../types/bookFile';
import { BookGenres } from '@/API/class/book_genre';
// import BookGenres from '@/API/class/book_genre'


export class Books extends Crud<Book> {
    private endPoint: string;
    private bookGenresAPI: BookGenres;
    constructor(token?: string) {
        super(token);
        this.endPoint = 'books';
        this.bookGenresAPI = new BookGenres(token);
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

    async createBookFile(data: Partial<BookFile>, bookGenres: number[]): Promise<Book>{
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

        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'POST',
            // headers: {'Content-Type': 'multipart/form'},
            body: formData,
        });

        const book = await res.json();
        console.log('Book created', book);
        bookGenres.forEach(async (genreId) => {
            const data = {id_book: book.id, id_genre: genreId}
            console.log('Creating book genre association', data);
            this.bookGenresAPI.create(data);
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

    async updateBookFile(id: number, data: Partial<BookFile>, bookGenres: number[]): Promise<Book> {
        const formData = new FormData();
        formData.append("title", data.title + '');
        formData.append("author_id", data.author_id + '');
        formData.append("description", data.description + '');
        formData.append("anio", data.anio + '');
        formData.append("isbn", data.isbn + '');
        if (data.image instanceof File) {
            formData.append("image", data.image);
            }
        formData.append("stock", data.stock + '');
        formData.append("subscriber_exclusive", data.subscriber_exclusive + '');
        formData.append("price", data.price + '');
        // for (const pair of formData.entries()) {
        // console.log(pair[0], pair[1]);
        // }
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/${id}`,{
            method: 'PUT',
            // headers: this.getHeaders(),
            body: formData,
        });
        const book = await res.json();

        console.log('Book created', book);
        
        // Delete existing book genres
        this.bookGenresAPI.deleteAll(book.id);
        
        // Create new book genres
        bookGenres.forEach(async (genreId) => {
            const data = {id_book: book.id, id_genre: genreId}
            console.log('Creating book genre association', data);
            this.bookGenresAPI.create(data);
        });
        
        console.log('Book genres updated', bookGenres);
        return book;
    }

    async delete(id: number): Promise<void> {
        await fetch(`${this.baseUrl}/${this.endPoint}/${id}`, {method: 'DELETE', headers: this.getHeaders(),});
    }
}