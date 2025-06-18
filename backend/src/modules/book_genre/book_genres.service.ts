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
  async create(data: Partial<BookGenreDto>): Promise<BookGenre> {
    const newGenre = this.bookGenreRepository.create({id_genre: data.id_genre,id_book: data.id_book});
    this.logger.log('Genero de Libro Creado');
    return this.bookGenreRepository.save(newGenre);
  }
  async delete(id: number) {
    this.logger.log('Genero de Libro Eliminado');
    return this.bookGenreRepository.delete(id);
  }
}