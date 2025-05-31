import { Injectable } from '@nestjs/common';
import { BooksService } from '../book/book.service';
import { LibraryBookDTO } from './library_book.dto';

@Injectable()
export class LibraryBooksService {
    constructor(private readonly booksService: BooksService) {}
        
        findAll(): Promise<LibraryBookDTO[]> {
            return this.booksService.findAll().then(books =>
                books.map(book => {
                    return new LibraryBookDTO(book.id, book.title, book.author_id, book.description,book.isbn, book.image);
                })
            );
        }
    
        findOne(id: number): Promise<LibraryBookDTO | null> {
            return this.booksService.findOne(id).then(book => {
                if (!book) {
                    return null;
                }
                    return new LibraryBookDTO(book.id, book.title, book.author_id, book.description,book.isbn, book.image)
                })
        }
}