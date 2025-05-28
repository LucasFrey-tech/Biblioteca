import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './book.service';
import { BooksController } from './book.controller';
import { Book } from '../../../entidades/book.entity';
import { Genre } from '../../../entidades/genre.entity';
import { Author } from 'src/entidades/author.entity';
import {CatalogueBooksModule} from '../catalogue/catalogue_books.module';
import {LibraryBooksModule} from '../library/library_books.module';
import {BookReviewsModule} from '../reviews/book_reviews.module';
import { BookGenre } from 'src/entidades/book_genres.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Genre, Author, BookGenre]),CatalogueBooksModule,LibraryBooksModule,BookReviewsModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}