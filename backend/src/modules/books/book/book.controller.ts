import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BooksService } from './book.service';
import { BookDTO } from './book.dto';
import { ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateBookDTO } from './createBook.dto';

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
  
  @Get('/with_genre/:id')
  @ApiOperation({ summary: 'Listar Todos los Libros de un mismo genero.' })
  @ApiResponse({ status: 200, description: 'Lista de Todos los Libros de un mismo genero.', type: [BookDTO] })
  getBooksWithGenre(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findAllWithGenre(id);
  }

  @Get('/with_author/:id')
  @ApiOperation({ summary: 'Listar Todos los Libros de un mismo autor.' })
  @ApiResponse({ status: 200, description: 'Lista de Todos los Libros de un mismo autor.', type: [BookDTO] })
  getBooksByAuthor(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findAllByAuthor(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener Libro por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Libro Encontrado', type: BookDTO })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear Libro' })
  @ApiBody({ type: CreateBookDTO })
  @ApiResponse({ status: 201, description: 'Libro Creado', type: CreateBookDTO })
  @UseInterceptors(FileInterceptor('image'))
  async create(@UploadedFile() file: Express.Multer.File, @Body() data: CreateBookDTO) {
    if (file) {
      data.image = this.booksService.bookImageUrl(file.filename); // ✅ ¡Usamos filename real!
    }

    return await this.booksService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Editar Libro' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: BookDTO })
  @ApiResponse({ status: 200, description: 'Libro Editado', type: CreateBookDTO })
  @UseInterceptors(FileInterceptor('image'))
  async update(@Param('id', ParseIntPipe) id: number, @Body() bookDTO: CreateBookDTO & { existingImage?: string }, @UploadedFile() file: Express.Multer.File) {
    // Convertir string a booleano si viene así
    if (typeof bookDTO.subscriber_exclusive === 'string') {
      bookDTO.subscriber_exclusive = bookDTO.subscriber_exclusive === 'true';
    }

    // Si se subió una nueva imagen, usarla
    if (file && file.filename) {
      bookDTO.image = this.booksService.bookImageUrl(file.filename);
    } else if (bookDTO.existingImage) {
      // Si no hay archivo nuevo, pero sí imagen existente, mantenerla
      bookDTO.image = bookDTO.existingImage;
    } else {
      // Si no hay ninguna imagen, poner null o un placeholder
      bookDTO.image = '';
    }

    if (typeof bookDTO.genre === 'string') {
      try {
        bookDTO.genre = JSON.parse(bookDTO.genre);
      } catch {
        throw new BadRequestException('Formato de género inválido');
      }
    }

    return this.booksService.update(id, bookDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar Libro' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Libro Eliminado' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.delete(id);
  }
}