import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {LibraryBooksController} from './library_books.controller'
import {LibraryBooksService} from './library_books.service'
import { UserVirtualBooks } from 'src/entidades/user_virtual_books.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserVirtualBooks])],
  controllers: [LibraryBooksController],
  providers: [LibraryBooksService],
})
export class LibraryBooksModule {}