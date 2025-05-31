import { Module } from '@nestjs/common';
import {CatalogueBooksController} from './catalogue_books.controller'
import {CatalogueBooksService} from './catalogue_books.service'
import { BooksService } from '../book/book.service';

@Module({
  imports: [BooksService],
  controllers: [CatalogueBooksController],
  providers: [CatalogueBooksService],
})
export class CatalogueBooksModule {}