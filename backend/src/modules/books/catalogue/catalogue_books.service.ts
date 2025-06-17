import { Injectable, Logger } from '@nestjs/common';
import { BooksService } from '../book/book.service';
import { CatalogueBookDTO } from './catalogue_book.dto';

@Injectable()
export class CatalogueBooksService {
    private readonly logger = new Logger(CatalogueBooksService.name)
    constructor(private readonly booksService: BooksService) { }

    async findAll(): Promise<CatalogueBookDTO[]> {
        return this.booksService.findAll().then(books =>
            books.map(book => {
                this.logger.log('Listado de Libros del Catalogo Obtenido');
                return new CatalogueBookDTO(book.id, book.title, book.author, book.author_id, book.description, book.genre, book.anio, book.image, book.stock, book.subscriber_exclusive, book.price);
            })
        );
    }

    async findOne(id: number) {
        return this.booksService.findOne(id).then(book => {
            if (!book) {
                this.logger.log('Libro No Encontrado');
                return null;
            }

            this.logger.log('Libro Encontrado');
            return new CatalogueBookDTO(book.id, book.title, book.author, book.author_id, book.description, book.genre, book.anio, book.image, book.stock, book.subscriber_exclusive, book.price);
        })
    }
}