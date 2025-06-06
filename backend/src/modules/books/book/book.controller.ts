import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { BooksService } from './book.service';
import { Book } from '../../../entidades/book.entity';
import { BookDTO } from './book.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Libros')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

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
  create(@Body() book: Partial<Book>) {
    return this.booksService.create(book);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Editar Libro' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: BookDTO })
  @ApiResponse({ status: 200, description: 'Libro Editado', type: BookDTO })
  update(@Param('id') id: number, @Body() book: Partial<Book>) {
    return this.booksService.update(id, book);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar Libro' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Libro Eliminado' })
  delete(@Param('id') id: number) {
    return this.booksService.delete(id);
  }
}