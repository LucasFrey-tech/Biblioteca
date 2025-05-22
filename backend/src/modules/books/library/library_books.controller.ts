import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { LibraryBooksService } from './library_books.service';
import { Book } from '../../../entidades/book.entity';

@Controller('library_books')
export class LibraryBooksController {

}