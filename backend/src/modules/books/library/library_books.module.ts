import { Module } from '@nestjs/common';
import {LibraryBooksController} from './library_books.controller'
import {LibraryBooksService} from './library_books.service'
import { BooksModule } from '../book/book.module';

@Module({
  imports: [BooksModule],
  controllers: [LibraryBooksController],
  providers: [LibraryBooksService],
})
export class LibraryBooksModule {}