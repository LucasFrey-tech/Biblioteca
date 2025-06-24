import { Module } from '@nestjs/common';
import {CatalogueBooksController} from './catalogue_books.controller'
import {CatalogueBooksService} from './catalogue_books.service'
import { BooksModule } from '../book/book.module';

@Module({
  imports: [BooksModule],
  controllers: [CatalogueBooksController],
  providers: [CatalogueBooksService],
})
export class CatalogueBooksModule {}