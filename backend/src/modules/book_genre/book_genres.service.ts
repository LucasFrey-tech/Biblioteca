import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookGenre } from 'src/entidades/book_genres.entity';

@Injectable()
export class BookGenresService {
  constructor(
    @InjectRepository(BookGenre)
    private bookGenreRepository: Repository<BookGenre>,
  ) {}

  async findAll(): Promise<BookGenre[]> {
    return this.bookGenreRepository.find();
  }
}