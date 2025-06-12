import { Injectable } from '@nestjs/common';
import { BooksService } from '../book/book.service';
import { LibraryBookDTO } from './library_book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserVirtualBooks } from 'src/entidades/user_virtual_books.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LibraryBooksService {
    constructor(
        private readonly booksService: BooksService,

        @InjectRepository(UserVirtualBooks)
        private userVirtualBooks: Repository<UserVirtualBooks>,
    ) {}
        
        async findAllByUser(idUser: number): Promise<LibraryBookDTO[]> {
            const userVirtualBooks = await this.userVirtualBooks.find({ where: { idUser } });
            // console.log("AHHHHHHHH ", userVirtualBooks);
            const result = await Promise.all(
                userVirtualBooks.map(async (vb) => {
                    const book = await this.booksService.findOne(vb.idBook);
                    console.log("AHHHHHHHH 3 ", vb)
                    if(!book) return null;
                    return new LibraryBookDTO(book.id, book.title, book.author_id, book.description, book.isbn, book.image);
                })    
            )
            
            return result.filter((item): item is LibraryBookDTO => item !== null);
        }
    
        // findOne(id: number): Promise<LibraryBookDTO | null> {
        //     return this.booksService.findOne(id).then(book => {
        //         if (!book) {
        //             return null;
        //         }
        //             return new LibraryBookDTO(book.id, book.title, book.author_id, book.description,book.isbn, book.image)
        //         })
        // }
}