import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './book.service';
import { BooksController } from './book.controller';
import { Book } from '../../../entidades/book.entity';
import { Genre } from '../../../entidades/genre.entity';
import { Author } from '../../../entidades/author.entity';
import {BookReviewsModule} from '../reviews/book_reviews.module';
import {LibraryBooksModule} from '../library/library_books.module';
import {CatalogueBooksModule} from '../catalogue/catalogue_books.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Genre, Author]),CatalogueBooksModule,LibraryBooksModule,BookReviewsModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}