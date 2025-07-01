import { Injectable, Logger } from '@nestjs/common';
import { BooksService } from '../book/book.service';
import { CatalogueBookDTO } from './dto/catalogue_book.dto';
import { PaginatedCatalogueBooksDTO } from './dto/cataloguePAG.dto';

@Injectable()
export class CatalogueBooksService {
    private readonly logger = new Logger(CatalogueBooksService.name);
    constructor(private readonly booksService: BooksService) { }

    /**
     * Obtiene todos los libros del catálogo.
     * 
     * @returns {Promise<CatalogueBookDTO[]>} Una promesa que resuelve con la lista de todos los libros del catálogo
     */
    async findAll(): Promise<CatalogueBookDTO[]> {
        const books = await this.booksService.findAll();
        
        const catalogueBooks = books.map(book => new CatalogueBookDTO({
            id: book.id,
            title: book.title,
            author: book.author ?? "",
            author_id: book.author_id ?? book.author_id,
            description: book.description,
            genre: book.genre,
            anio: book.anio,
            image: book.image,
            stock: book.stock,
            subscriber_exclusive: book.subscriber_exclusive,
            price: book.price
        }));

        this.logger.log('Listado de Libros del Catálogo Obtenido (sin paginación)');
        return catalogueBooks;
    }

    /**
     * Obtiene todos los libros del catálogo con paginación.
     * 
     * @param {number} page - Página solicitada (basada en 1)
     * @param {number} limit - Cantidad de libros por página
     * @returns {Promise<PaginatedCatalogueBooksDTO>} Una promesa que resuelve con un objeto que contiene la lista de libros y el total
     */
    async findAllPaginated(page: number = 1, limit: number = 10): Promise<PaginatedCatalogueBooksDTO> {
        const { books, total } = await this.booksService.findAllPaginated(page, limit);

        const catalogueBooks = books.map(book => new CatalogueBookDTO({
            id: book.id,
            title: book.title,
            author: book.author ?? "",
            author_id: book.author_id ?? book.author_id,
            description: book.description,
            genre: book.genre,
            anio: book.anio,
            image: book.image,
            stock: book.stock,
            subscriber_exclusive: book.subscriber_exclusive,
            price: book.price
        }));

        this.logger.log('Listado de Libros del Catálogo Obtenido (paginada)');
        return { books: catalogueBooks, total };
    }

    /**
     * Busca un libro específico del catálogo por su ID.
     * 
     * @param {number} id - El ID del libro a buscar.
     * @returns {Promise<CatalogueBookDTO | null>} Una promesa que resuelve con el libro encontrado o null.
     */
    async findOne(id: number): Promise<CatalogueBookDTO | null> {
        const book = await this.booksService.findOne(id);

        if (!book) {
            this.logger.log('Libro No Encontrado');
            return null;
        }

        this.logger.log('Libro Encontrado');
        return new CatalogueBookDTO({
            id: book.id,
            title: book.title,
            author: book.author ?? '',
            author_id: book.author_id ?? book.author_id,
            description: book.description,
            genre: book.genre,
            anio: book.anio,
            image: book.image,
            stock: book.stock,
            subscriber_exclusive: book.subscriber_exclusive,
            price: book.price
        });
    }
}