import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {LibraryBooksController} from './library_books.controller'
import {LibraryBooksService} from './library_books.service'
import { UserVirtualBooks } from 'src/entidades/user_virtual_books.entity';
import { Genre } from 'src/entidades/genre.entity';
import { Book } from 'src/entidades/book.entity';
import { User } from 'src/entidades/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserVirtualBooks, Book, Genre, User])],
  controllers: [LibraryBooksController],
  providers: [LibraryBooksService],
})
export class LibraryBooksModule {}