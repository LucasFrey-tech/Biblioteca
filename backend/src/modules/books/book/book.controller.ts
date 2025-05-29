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
  findOne(@Param('id') id: number) {
    return this.booksService.findOne(id);
  }

  @Post()
  create(@Body() book: Partial<Book>) {
    return this.booksService.create(book);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() book: Partial<Book>) {
    return this.booksService.update(id, book);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.booksService.delete(id);
  }
}