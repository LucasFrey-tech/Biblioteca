import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './book.service';
import { BooksController } from './book.controller';
import { Book } from '../../../entidades/book.entity';
import { Genre } from '../../../entidades/genre.entity';
import { Author } from '../../../entidades/author.entity';
import { BookGenre } from 'src/entidades/book_genres.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Genre, Author, BookGenre])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}