import { Injectable } from '@nestjs/common';
import { BooksService } from '../book/book.service';
import { CatalogueBookDTO } from './catalogue_book.dto';

@Injectable()
export class CatalogueBooksService {
    constructor(private readonly booksService: BooksService) { }

    async findAll(): Promise<CatalogueBookDTO[]> {
        return this.booksService.findAll().then(books =>
            books.map(book => {
                return new CatalogueBookDTO(book.id, book.title, book.author, book.author_id, book.description, book.genre, book.anio, book.image, book.stock, book.subscriber_exclusive, book.price);
            })
        );
    }

    async findOne(id: number) {
        return this.booksService.findOne(id).then(book => {
            if (!book) {
                return null;
            }
            return new CatalogueBookDTO(book.id, book.title, book.author, book.author_id, book.description, book.genre, book.anio, book.image, book.stock, book.subscriber_exclusive, book.price);
        })
    }
}