import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookDTO } from './book.dto';
import { Book } from '../../../entidades/book.entity';
import { SettingsService } from 'src/settings.service';
import { CreateBookDTO } from './createBook.dto';

@Injectable()
export class BooksService {
  private readonly logger = new Logger(BooksService.name);
  constructor(
    private readonly settingsService: SettingsService,

    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
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
    const book = this.booksRepository.create(bookDTO);
    const bookEntity = await this.booksRepository.save(book);
    return bookEntity;
  }

  async update(id: number, bookDTO: CreateBookDTO) {
    await this.booksRepository.update(id, bookDTO);
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
