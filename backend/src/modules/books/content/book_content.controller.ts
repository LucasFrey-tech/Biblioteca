import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { BookContentService } from './book_content.service';
import { BookContentDTO } from './book_content.dto';

@Controller('book/content')
export class BookContentController {
  constructor(private readonly bookContentService: BookContentService) {}

    @Get(':id')
    async get(@Param('id') id: number):Promise<BookContentDTO|null> {
        return await this.bookContentService.get(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() book: BookContentDTO) {
        return this.bookContentService.update(id, book);
    }
}