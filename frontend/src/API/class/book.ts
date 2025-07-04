import { Crud, PaginatedResponse } from '../service';
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
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Error al obtener libros (${res.status}): ${errorDetails}`);
        }
        const data = await res.json();
        if (!Array.isArray(data)) {
            throw new Error('Respuesta no es un arreglo de libros');
        }
        return data;
    }

    async getAllPaginated(page: number = 1, limit: number = 10, query: string = ''): Promise<PaginatedResponse<Book>> {
        const url = query 
            ? `${this.baseUrl}/${this.endPoint}/paginated?page=${page}&limit=${limit}&query=${encodeURIComponent(query)}`
            : `${this.baseUrl}/${this.endPoint}/paginated?page=${page}&limit=${limit}`;
        
        const res = await fetch(url, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Error al obtener libros paginados (${res.status}): ${errorDetails}`);
        }

        const data = await res.json();

        // Adaptador para compatibilidad
        return {
            items: data.books || [],
            total: data.total || 0
        };
    }

    async getBooksWithGenre(idGenre: number): Promise<Book[]> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/with_genre/${idGenre}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Error al obtener libros por género (${res.status}): ${errorDetails}`);
        }
        const data = await res.json();
        if (!Array.isArray(data)) {
            throw new Error('Respuesta no es un arreglo de libros');
        }
        return data;
    }

    async getBooksWithGenresPaginated(genreIds: number[], page = 1, limit = 10): Promise<PaginatedResponse<Book>> {
        const genreQuery = genreIds.join(',');
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/with_genres?genres=${genreQuery}&page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Error al obtener libros por géneros múltiples (${res.status}): ${errorDetails}`);
        }

        const data = await res.json();
        return {
            items: data.books || [],
            total: data.total || 0
        };
    }

    async getBooksByAuthor(idAuthor: number): Promise<Book[]> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/with_author/${idAuthor}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Error al obtener libros por autor (${res.status}): ${errorDetails}`);
        }
        const data = await res.json();
        if (!Array.isArray(data)) {
            throw new Error('Respuesta no es un arreglo de libros');
        }
        return data;
    }

    async getBooksByAuthorPaginated(idAuthor: number, page: number = 1, limit: number = 10): Promise<PaginatedResponse<Book>> {
        const idStr = idAuthor.toString();
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/with_author/${idStr}?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Error al obtener libros paginados por autor (${res.status}): ${errorDetails}`);
        }
        const data = await res.json();
        return {
            items: data.books || data.items || [],
            total: data.total || 0
        };
    }

    async getOne(id: number): Promise<Book> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/${id}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Error al obtener libro (${res.status}): ${errorDetails}`);
        }
        return res.json();
    }

    async create(data: Partial<Book>): Promise<Book> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Error al crear libro (${res.status}): ${errorDetails}`);
        }
        return res.json();
    }

    async createBookFile(data: Partial<BookFile>, bookGenres: number[]): Promise<Book> {
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

        formData.append("genre", JSON.stringify(bookGenres));

        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'POST',
            body: formData,
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Error al crear libro (${res.status}): ${errorDetails}`);
        }
        return res.json();
    }

    async update(id: number, data: Partial<Book>): Promise<Book> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/${id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Error al actualizar libro (${res.status}): ${errorDetails}`);
        }
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

        if (data.image instanceof File) {
            formData.append("image", data.image)
        } else if (typeof data.image === 'string') {
            formData.append("existingImage", data.image)
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
            const errorDetails = await res.text();
            throw new Error(`Error al actualizar libro (${res.status}): ${errorDetails}`);
        }
        return res.json();
    }

    async delete(id: number): Promise<void> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Error al eliminar libro (${res.status}): ${errorDetails}`);
        }
    }

    async deleteSQL(id: number): Promise<void> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/hard/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Error al eliminar libro (${res.status}): ${errorDetails}`);
        }
    }
}