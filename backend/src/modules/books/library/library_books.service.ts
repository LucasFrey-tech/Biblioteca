import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksService } from '../book/book.service';
import { LibraryBookDTO } from './dto/library_book.dto';
import { UserVirtualBooks } from 'src/entidades/user_virtual_books.entity';

@Injectable()
export class LibraryBooksService {
    constructor(
        private readonly booksService: BooksService,

        @InjectRepository(UserVirtualBooks)
        private userVirtualBooks: Repository<UserVirtualBooks>,
    ) { }

    async findAllByUser(idUser: number): Promise<LibraryBookDTO[]> {
        const userVirtualBooks = await this.userVirtualBooks.find({ where: { idUser } });

        console.log('Registros encontrados:', userVirtualBooks);

        const result = await Promise.all(
            userVirtualBooks.map(async (vb) => {
                const book = await this.booksService.findOne(vb.idBook);

                console.log(`Libro ${vb.idBook}:`, book);
                
                if (!book) return null;
                return new LibraryBookDTO(book.id, book.title, book.author_id, book.description, book.isbn, book.image);
            })
        )

        return result.filter((item): item is LibraryBookDTO => item !== null);
    }

    async create(userVirtualBook: { idUser: number, idBook: number }): Promise<UserVirtualBooks> {
        // Verifico si el usuario ya tiene este libro en su libreria
        const existingRecord = await this.userVirtualBooks.findOne({
            where: {
                idUser: userVirtualBook.idUser,
                idBook: userVirtualBook.idBook
            }
        });

        if (existingRecord) {
            throw new Error('El usuario ya tiene este libro en su biblioteca');
        }

        // Crear el nuevo registro
        const newRecord = this.userVirtualBooks.create(userVirtualBook);
        return await this.userVirtualBooks.save(newRecord);
    }
}