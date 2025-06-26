import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { BookDTO } from './book.dto';
import { Book } from '../../../entidades/book.entity';
import { SettingsService } from '../../../settings.service';
import { CreateBookDTO } from './createBook.dto';
import { Genre } from '../../../entidades/genre.entity';
import { Author } from '../../../entidades/author.entity';

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

  async findAllWithGenre(genreId: number): Promise<BookDTO[]> {
    const books = await this.booksRepository.find({ relations: ['genres','author'] });
    const filteredBooks = books.filter(x => x.genres?.some(genre => genre.id === genreId));
    const result = filteredBooks.map((book) => {
      return BookDTO.BookEntity2BookDTO(book);
    });

    this.logger.log('Lista de libros Recibidos');
    return result;
  }

  async findAllByAuthor(authorId: number): Promise<BookDTO[]> {
    const books = await this.booksRepository.find({ relations: ['genres','author'] });
    const filteredBooks = books.filter(x => x.author?.id === authorId);
    const result = filteredBooks.map((book) => {
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
      genres,
      author: { id: bookDTO.author_id}
    });

    // 3. Guardar el libro
    const bookEntity = await this.booksRepository.save(book);
    return bookEntity;
  }

  async update(id: number, bookDTO: CreateBookDTO) {
      // 1. Buscar el libro con relaciones
    const book = await this.booksRepository.findOne({ where: { id }, relations: ['genres'] });
    if (!book) return null;

    // 2. Buscar los géneros
    const genres = await this.genreRepository.find();

    
    // 3. Asignar los campos del DTO al libro
    book.title = bookDTO.title;
    book.description = bookDTO.description;
    book.anio = bookDTO.anio;
    book.isbn = bookDTO.isbn;
    if(bookDTO.image) {
      book.image = bookDTO.image;
    }
    book.stock = bookDTO.stock;
    book.subscriber_exclusive = bookDTO.subscriber_exclusive;
    book.price = bookDTO.price;
    book.author = { id: bookDTO.author_id } as Author;
    
    // Actualizar Generos:
    const newGenres = bookDTO.genre.filter(x => !book.genres?.some(g => g.id == x))|| [];
    console.log('Generos Nuevos: ', newGenres);
    const genresToRemove = book.genres?.filter(x => !bookDTO.genre.some(g => x.id == g)) || [];
    console.log('Generos removidos: ', genresToRemove);

    newGenres.forEach(ng => {
      const genreToAdd = genres.find(g => g.id == ng);
      if (genreToAdd) {
        book.genres?.push(genreToAdd);
      }
    })

    genresToRemove.forEach(dg => {
      const genreToRemoveIndex = book.genres?.findIndex(g => g.id == dg.id);
      if (genreToRemoveIndex !== undefined && genreToRemoveIndex > -1 && book.genres) {
        book.genres.splice(genreToRemoveIndex, 1);
      }
    })
    
    // 4. Guardar
    await this.booksRepository.save(book);

    this.logger.log('Libro Actualizado');
    return this.findOne(id);
  }

  async delete(id: number): Promise<boolean> {
  const book = await this.booksRepository.findOne({
    where: { id },
    relations: ['genres'],
  });

  if (!book) return false;

  await this.booksRepository.remove(book); 

  return true;
}
  
  bookImageUrl = (imageName:string):string=>{
    return this.settingsService.getHostUrl()+this.settingsService.getBooksImagesPrefix()+"/"+imageName;
  }
}
