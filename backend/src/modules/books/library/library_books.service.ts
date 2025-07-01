import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LibraryBookDTO } from './dto/library_book.dto';
import { User } from '../../../entidades/user.entity';
import { Book } from '../../../entidades/book.entity';
import { UserVirtualBooks } from '../../../entidades/user_virtual_books.entity';

@Injectable()
export class LibraryBooksService {
  private readonly logger = new Logger(LibraryBooksService.name);

  constructor(
    @InjectRepository(UserVirtualBooks)
    private readonly userVirtualBooksRepository: Repository<UserVirtualBooks>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) { }

  async findAllByUserPaginated(idUser: number, page: number = 1, limit: number = 10): Promise<{ items: LibraryBookDTO[]; total: number }> {
    const user = await this.userRepository.findOne({ where: { id: idUser } });
    if (!user) throw new Error('Usuario no encontrado');

    const [userVirtualBooks, total] = await this.userVirtualBooksRepository.findAndCount({
      where: { user: { id: idUser } },
      relations: ['book', 'book.author', 'book.genres'],
      skip: (page - 1) * limit,
      take: limit,
    });

    const items = userVirtualBooks.map(vb => new LibraryBookDTO(
      vb.book.id,
      vb.book.title,
      vb.book.author?.id,
      vb.book.description,
      vb.book.genres ?? [],
      vb.book.isbn,
      vb.book.image
    ));

    this.logger.log(`Lista de Libros de Librería del Usuario Obtenida (paginada, usuario: ${idUser}, página: ${page}, límite: ${limit})`);
    return { items, total };
  }

  async findAllByUser(idUser: number): Promise<LibraryBookDTO[]> {
    const user = await this.userRepository.findOne({ where: { id: idUser } });
    if (!user) throw new Error('Usuario no encontrado');

    const userVirtualBooks = await this.userVirtualBooksRepository.find({
      where: { user: { id: idUser } },
      relations: ['book', 'book.author', 'book.genres'],
    });

    const result = userVirtualBooks.map(vb => new LibraryBookDTO(
      vb.book.id,
      vb.book.title,
      vb.book.author?.id,
      vb.book.description,
      vb.book.genres ?? [],
      vb.book.isbn,
      vb.book.image
    ));

    this.logger.log('Lista de Libros de Librería del Usuario Obtenida');
    return result;
  }

  async create(input: { idUser: number, idBook: number }): Promise<UserVirtualBooks> {
    const user = await this.userRepository.findOne({ where: { id: input.idUser } });
    if (!user) throw new Error('Usuario no encontrado');

    const book = await this.bookRepository.findOne({ where: { id: input.idBook } });
    if (!book) throw new Error('Libro no encontrado');

    const existing = await this.userVirtualBooksRepository.findOne({
      where: {
        user: { id: input.idUser },
        book: { id: input.idBook }
      }
    });

    if (existing) {
      this.logger.log('Libro ya Obtenido por el Usuario');
      throw new Error('El usuario ya tiene este libro en su biblioteca');
    }

    const newRecord = this.userVirtualBooksRepository.create({ user, book });
    this.logger.log('Libro de Librería Creado');
    return await this.userVirtualBooksRepository.save(newRecord);
  }
}