import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { BookDTO } from './book.dto';
import { Book } from '../../../entidades/book.entity';
import { SettingsService } from 'src/settings.service';
import { CreateBookDTO } from './createBook.dto';
import { Genre } from 'src/entidades/genre.entity';

@Injectable()
export class BooksService {
  private readonly logger = new Logger(BooksService.name);
  constructor(
    private readonly settingsService: SettingsService,

    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) { }

  async findAll(): Promise<BookDTO[]> {
    const books = await this.booksRepository.find({ relations: ['genres','author'] });
    
    const result = books.map((book) => {
      return BookDTO.BookEntity2BookDTO(book);
    });

    this.logger.log('Lista de libros Recibidos');
    return result;
  }

  async findOne(id: number): Promise<BookDTO | null> {
    const book = await this.booksRepository.findOne({ where: { id }, relations: ['genres','author'] });
    
    if (!book) return null;

    this.logger.log('Libro Recibido');
    return BookDTO.BookEntity2BookDTO(book);
  }

  async create(bookDTO: CreateBookDTO) {
    this.logger.log('Libro Creado');

    // 1. Buscar las entidades de género por nombre (bookDTO.genre)
    const genres = await this.genreRepository.find({
      where: { id: In(bookDTO.genre) },
    });

    if (genres.length !== bookDTO.genre.length) {
      throw new Error('Algunos géneros no existen en la base de datos');
    }

    // 2. Crear la entidad de libro
    const book = this.booksRepository.create({
      ...bookDTO,
      genres, // <-- Asociamos las entidades encontradas
    });

    // 3. Guardar el libro
    const bookEntity = await this.booksRepository.save(book);
    return bookEntity;
  }

  async update(id: number, bookDTO: CreateBookDTO) {
      // 1. Buscar el libro con relaciones
    const book = await this.booksRepository.findOne({ where: { id }, relations: ['genres', 'author'] });
    if (!book) return null;

    // 2. Buscar los géneros por nombre
    const genres = await this.genreRepository.find({
      where: bookDTO.genre.map((id) => ({ id })),
    });

    // 3. Asignar los campos del DTO al libro
    book.title = bookDTO.title;
    book.description = bookDTO.description;
    book.anio = bookDTO.anio;
    book.isbn = bookDTO.isbn;
    book.image = bookDTO.image;
    book.stock = bookDTO.stock;
    book.subscriber_exclusive = bookDTO.subscriber_exclusive;
    book.price = bookDTO.price;
    book.author_id = bookDTO.author_id;
    book.genres = genres;

    // 4. Guardar
    await this.booksRepository.save(book);

    this.logger.log('Libro Actualizado');
    return this.findOne(id);
  }

  delete(id: number) {
    this.logger.log('Libro Borrado');
    return this.booksRepository.delete(id);
  }
  
  bookImageUrl = (imageName:string):string=>{
    return this.settingsService.getHostUrl()+this.settingsService.getBooksImagesPrefix()+"/"+imageName;
  }
}
