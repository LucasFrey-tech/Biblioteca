import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { BooksService } from './book.service';
import { Book } from '../../../entidades/book.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Book> {
    return this.booksService.findOne(id);
  }

  @Post()
  create(@Body() newBook: Partial<Book>): Promise<Book> {
    return this.booksService.create(newBook);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() book: Partial<Book>): Promise<Book> {
    return this.booksService.update(id, book);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.booksService.remove(id);
  }
}