import { Controller, Get } from '@nestjs/common';
import { BookGenresService } from './book_genres.service';
import { BookGenre } from 'src/entidades/book_genres.entity';

@Controller('book_genres')
export class BookGenresController {
  constructor(private readonly bookGenresService: BookGenresService) {}

  @Get()
  async findAll(): Promise<BookGenre[]> {
    return this.bookGenresService.findAll();
  }
}