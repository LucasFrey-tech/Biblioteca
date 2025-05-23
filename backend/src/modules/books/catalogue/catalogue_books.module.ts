import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../../../entidades/book.entity';
import { Genre } from '../../../entidades/genre.entity';
import {CatalogueBooksController} from './catalogue_books.controller'
import {CatalogueBooksService} from './catalogue_books.service'

@Module({
  imports: [TypeOrmModule.forFeature([Book, Genre])],
  controllers: [CatalogueBooksController],
  providers: [CatalogueBooksService],
})
export class CatalogueBooksModule {}