import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BooksService } from './book.service';
import { BookDTO } from './book.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Libros')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Get()
  @ApiOperation({ summary: 'Listar Todos los Libros' })
  @ApiResponse({ status: 200, description: 'Lista de Todos los Libros', type: [BookDTO] })
  async findAll(): Promise<BookDTO[]> {
    return (await this.booksService.findAll());
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener Libro por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Libro Encontrado', type: BookDTO })
  findOne(@Param('id') id: number) {
    return this.booksService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear Libro' })
  @ApiBody({ type: BookDTO })
  @ApiResponse({ status: 201, description: 'Libro Creado', type: BookDTO })
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() bookDTO: BookDTO, @UploadedFile() file: Express.Multer.File) {
    console.log('Archivo recibido:', bookDTO);
    bookDTO.image = this.booksService.bookImageUrl(file.originalname);
    return this.booksService.create(bookDTO);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Editar Libro' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: BookDTO })
  @ApiResponse({ status: 200, description: 'Libro Editado', type: BookDTO })
  @UseInterceptors(FileInterceptor('image'))
  update(@Param('id') id: number, @Body() bookDTO: BookDTO, @UploadedFile() file: Express.Multer.File | string) {
    console.log('Archivo recibido para actualizar:', bookDTO.image);
    console.log('ArchivoAAAAAAAAAAAAAAAAAAAAAAAA :', bookDTO.subscriber_exclusive);
    if (typeof file != 'string') {
      bookDTO.image = this.booksService.bookImageUrl(file.originalname);
    }
    return this.booksService.update(id, bookDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar Libro' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Libro Eliminado' })
  delete(@Param('id') id: number) {
    return this.booksService.delete(id);
  }
}