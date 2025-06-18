import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookDTO } from './book.dto';
import { Book } from '../../../entidades/book.entity';
import { SettingsService } from 'src/settings.service';

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
      return BookDTO.BookEntity2BookDTO(book, book.author ? book.author.name : "", book.genres.map((g) => g.name));
    });

    this.logger.log('Lista de libros Recibidos');
    return result;
  }

  async findOne(id: number): Promise<BookDTO | null> {
    const book = await this.booksRepository.findOne({ where: { id }, relations: ['genres','author'] });
    
    if (!book) return null;

    this.logger.log('Libro Recibido');
    return BookDTO.BookEntity2BookDTO(book, book.author ? book.author.name : "", book.genres.map((g) => g.name));
  }

  create(bookDTO: BookDTO) {
    const book = BookDTO.BookDTO2BookEntity(bookDTO);
    this.logger.log('Libro Creado');    
    return this.booksRepository.save(book);
  }

  async update(id: number, bookDTO: BookDTO) {
    const updateData = BookDTO.BookDTO2BookEntity(bookDTO);
    await this.booksRepository.update(id, updateData);
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
