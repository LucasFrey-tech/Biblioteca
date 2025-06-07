import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BooksService } from './book.service';
import { BookDTO } from './book.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  
  @Get()
  async findAll(): Promise<BookDTO[]> {
    return (await this.booksService.findAll());
  }
  
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.booksService.findOne(id);
  }
  
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() bookDTO: BookDTO, @UploadedFile() file: Express.Multer.File) {
    bookDTO.image = this.booksService.bookImageUrl(file.originalname) ;
    return this.booksService.create(bookDTO);
  }
  
  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(@Param('id') id: number, @Body() bookDTO: BookDTO,@UploadedFile() file: Express.Multer.File| string) {
    if (typeof file != 'string') {
      bookDTO.image = this.booksService.bookImageUrl(file.originalname) ;
    }
    return this.booksService.update(id, bookDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.booksService.delete(id);
  }
}