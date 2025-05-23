import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../../../entidades/book.entity';
import { Genre } from '../../../entidades/genre.entity';
import {LibraryBooksController} from './library_books.controller'
import {LibraryBooksService} from './library_books.service'

@Module({
  imports: [TypeOrmModule.forFeature([Book, Genre])],
  controllers: [LibraryBooksController],
  providers: [LibraryBooksService],
})
export class LibraryBooksModule {}