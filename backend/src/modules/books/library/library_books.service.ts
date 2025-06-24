import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LibraryBookDTO } from './dto/library_book.dto';
import { UserVirtualBooks } from '../../../entidades/user_virtual_books.entity';

@Injectable()
export class LibraryBooksService {
    private readonly logger = new Logger(LibraryBooksService.name);
    constructor(
        @InjectRepository(UserVirtualBooks)
        private userVirtualBooks: Repository<UserVirtualBooks>,
    ) { }

    async findAllByUser(idUser: number): Promise<LibraryBookDTO[]> {
        const userVirtualBooks = await this.userVirtualBooks.find({ where: { idUser }, relations: ['book'] });

        const result = await Promise.all(
            userVirtualBooks.map(async (vb) => {

                this.logger.log('Lista de Libros de Libreria del Usuario Obtenida');
                return new LibraryBookDTO(vb.book.id, vb.book.title, vb.book.author_id, vb.book.description, vb.book.isbn, vb.book.image);
            })
        )

        this.logger.log('Elementos null Removidos');
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
            this.logger.log('Libro ya Obtenido por el Usuario');
            throw new Error('El usuario ya tiene este libro en su biblioteca');
        }

        // Crear el nuevo registro
        const newRecord = this.userVirtualBooks.create(userVirtualBook);
        this.logger.log('Libro de Libreria Creado');
        return await this.userVirtualBooks.save(newRecord);
    }
}