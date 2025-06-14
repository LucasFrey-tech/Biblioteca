import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookGenre } from 'src/entidades/book_genres.entity';
import { Genre } from 'src/entidades/genre.entity';

@Injectable()
export class BookGenresService {
  constructor(
    @InjectRepository(BookGenre)
    private bookGenreRepository: Repository<BookGenre>,
     @InjectRepository(Genre)
      private genreRepository: Repository<Genre>,
  ) {}

  async findAll(): Promise<BookGenre[]> {
    return this.bookGenreRepository.find();
  }
  async create(data: Partial<BookGenreDto>): Promise<BookGenre> {
    const genre = await this.genreRepository.findOne({ where: { name: data.name } });
    const newGenre = this.bookGenreRepository.create({
      id_genre: genre?.id,id_book: data.id_book});
    return this.bookGenreRepository.save(newGenre);
  }
  async delete(id: number) {
    return this.bookGenreRepository.delete(id);
  }
}