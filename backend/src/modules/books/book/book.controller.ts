import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BooksService } from './book.service';
import { BookDTO } from './book.dto';
import { ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateBookDTO } from './createBook.dto';

/**
 * Controlador para gestionar las operaciones de los libros.
 * Proporciona endpoints para crear, leer, actualizar y eliminar libros,
 * así como para obtener libros filtrados por género o autor.
 */
@ApiTags('Libros')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  /**
   * Obtiene todos los libros disponibles en el sistema.
   * 
   * @returns {Promise<BookDTO[]>} Lista de libros en formato DTO
   */
  @Get()
  @ApiOperation({ summary: 'Listar Todos los Libros' })
  @ApiResponse({ status: 200, description: 'Lista de Todos los Libros', type: [BookDTO] })
  async findAll(): Promise<BookDTO[]> {
    return (await this.booksService.findAll());
  }
  
  /**
   * Obtiene todos los libros pertenecientes a un género específico.
   * 
   * @param {number} id - ID del género a filtrar
   * @returns {Promise<BookDTO[]>} Lista de libros del género especificado
   */
  @Get('/with_genre/:id')
  @ApiOperation({ summary: 'Listar Todos los Libros de un mismo genero.' })
  @ApiResponse({ status: 200, description: 'Lista de Todos los Libros de un mismo genero.', type: [BookDTO] })
  getBooksWithGenre(@Param('id', ParseIntPipe) id: number): Promise<BookDTO[]> {
    return this.booksService.findAllWithGenre(id);
  }

  /**
   * Obtiene todos los libros escritos por un autor específico.
   * 
   * @param {number} id - ID del autor a filtrar
   * @returns {Promise<BookDTO[]>} Lista de libros del autor especificado
   */
  @Get('/with_author/:id')
  @ApiOperation({ summary: 'Listar Todos los Libros de un mismo autor.' })
  @ApiResponse({ status: 200, description: 'Lista de Todos los Libros de un mismo autor.', type: [BookDTO] })
  getBooksByAuthor(@Param('id', ParseIntPipe) id: number): Promise<BookDTO[]> {
    return this.booksService.findAllByAuthor(id);
  }

  /**
   * Obtiene un libro específico por su ID.
   * 
   * @param {number} id - ID del libro a buscar
   * @returns {Promise<BookDTO>} Libro encontrado
   */
  @Get(':id')
  @ApiOperation({ summary: 'Obtener Libro por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Libro Encontrado', type: BookDTO })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(id);
  }

  /**
   * Crea un nuevo libro en el sistema.
   * 
   * @param {Express.Multer.File} file - Archivo de imagen del libro (opcional)
   * @param {CreateBookDTO} data - Datos del libro a crear
   * @returns {Promise<Book>} Libro creado
   */
  @Post()
  @ApiOperation({ summary: 'Crear Libro' })
  @ApiBody({ type: CreateBookDTO })
  @ApiResponse({ status: 201, description: 'Libro Creado', type: CreateBookDTO })
  @UseInterceptors(FileInterceptor('image'))
  async create(@UploadedFile() file: Express.Multer.File, @Body() data: CreateBookDTO) {
    if (file) {
      data.image = this.booksService.bookImageUrl(file.filename);
    }

    return await this.booksService.create(data);
  }

  /**
   * Actualiza un libro existente.
   * 
   * @param {number} id - ID del libro a actualizar
   * @param {CreateBookDTO} bookDTO - Datos actualizados del libro
   * @param {Express.Multer.File} file - Nueva imagen del libro (opcional)
   * @returns {Promise<Book>} Libro actualizado
   * @throws {BadRequestException} Si el formato del género es inválido
   */
  @Put(':id')
  @ApiOperation({ summary: 'Editar Libro' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: BookDTO })
  @ApiResponse({ status: 200, description: 'Libro Editado', type: CreateBookDTO })
  @UseInterceptors(FileInterceptor('image'))
  async update( @Param('id', ParseIntPipe) id: number, @Body() bookDTO: CreateBookDTO & { existingImage?: string }, @UploadedFile() file: Express.Multer.File) {
    
    if (typeof bookDTO.subscriber_exclusive === 'string') {
      bookDTO.subscriber_exclusive = bookDTO.subscriber_exclusive === 'true';
    }

    if (file && file.filename) {
      bookDTO.image = this.booksService.bookImageUrl(file.filename);
    } else if (bookDTO.existingImage) {
      bookDTO.image = bookDTO.existingImage;
    } else {
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

  /**
   * Elimina un libro del sistema.
   * 
   * @param {number} id - ID del libro a eliminar
   * @returns {Promise<boolean>} Resultado de la operación:
   * - true si el libro fue eliminado
   * - false si el libro no existía
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar Libro' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Libro Eliminado' })
  delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.booksService.delete(id);
  }
}