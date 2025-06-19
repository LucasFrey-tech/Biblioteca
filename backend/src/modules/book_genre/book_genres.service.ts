import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookGenre } from 'src/entidades/book_genres.entity';
import { BookGenreDto } from './book_genre.dto';

@Injectable()
export class BookGenresService {
  private readonly logger = new Logger(BookGenresService.name);
  constructor(
    @InjectRepository(BookGenre)
    private bookGenreRepository: Repository<BookGenre>,
  ) {}

  async findAll(): Promise<BookGenre[]> {
    this.logger.log('Listado de Generos de Libro Obtenido');
    return this.bookGenreRepository.find({relations: ['book','genre']});
  }
  
  create(data: Partial<BookGenreDto>) {
    console.log(data);
    const newGenre = this.bookGenreRepository.create(data);
    console.log(newGenre);
    this.logger.log('Genero de Libro Creado');
    return this.bookGenreRepository.save(newGenre);
  }
  async deleteAllFromBook(idBook: number) {
    this.logger.log('Genero de Libro Eliminado');
    return this.bookGenreRepository.delete({id_book: idBook});
  }
  async delete(id: number) {
    this.logger.log('Genero de Libro Eliminado');
    return this.bookGenreRepository.delete(id);
  }
}