import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, UploadedFile, BadRequestException, Query, ParseIntPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BooksService } from './book.service';
import { BookDTO } from './dto/book.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { CreateBookDTO } from './dto/createBook.dto';

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
   * Obtiene todos los libros disponibles.
   * 
   * @returns {Promise<BookDTO[]>} Lista de todos los libros activos
   */
  @Get()
  @ApiOperation({ summary: 'Listar Todos los Libros' })
  @ApiResponse({ status: 200, description: 'Lista de Todos los Libros', type: BookDTO, isArray: true })
  async findAll(): Promise<BookDTO[]> {
    return await this.booksService.findAll();
  }

  /**
   * Obtiene todos los libros disponibles con paginación.
   * 
   * @param {number} page - Página solicitada (basada en 1)
   * @param {number} limit - Cantidad de libros por página
   * @returns {Promise<{ books: BookDTO[], total: number }>} Lista de libros paginados y total de registros
   */
  @Get('paginated')
  @ApiOperation({ summary: 'Listar Libros Paginados' })
  @ApiQuery({ name: 'page', type: Number, required: false, description: 'Página solicitada (basada en 1)', example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, description: 'Cantidad de libros por página', example: 10 })
  @ApiResponse({ status: 200, description: 'Lista de Libros Paginada', type: [BookDTO] })
  async findAllPaginated(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10
  ): Promise<{ books: BookDTO[], total: number }> {
    return await this.booksService.findAllPaginated(page, limit);
  }

  /**
   * Obtiene todos los libros pertenecientes a un género específico con paginación.
   * 
   * @param {number} id - ID del género a filtrar
   * @param {number} page - Página solicitada (basada en 1)
   * @param {number} limit - Cantidad de libros por página
   * @returns {Promise<{ books: BookDTO[], total: number }>} Lista de libros paginados y total de registros
   */
  @Get('/with_genres')
  @ApiOperation({ summary: 'Listar libros que pertenecen a TODOS los géneros seleccionados' })
  @ApiQuery({ name: 'genres', type: String, required: true, description: 'IDs de géneros separados por coma', example: '1,2,3' })
  @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, example: 10 })
  @ApiResponse({ status: 200, description: 'Lista de libros con TODOS los géneros seleccionados', type: Object })
  async getBooksWithGenres(
    @Query('genres') genres: string,
    @Query('page', new ParseIntPipe({ optional: true })) page = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit = 10,
  ): Promise<{ books: BookDTO[], total: number }> {
    const genreIds = genres
      .split(',')
      .map((id) => parseInt(id.trim()))
      .filter((id) => !isNaN(id));

    if (genreIds.length === 0) {
      throw new BadRequestException('Debe proporcionar al menos un género válido');
    }

    return this.booksService.findAllWithGenres(genreIds, page, limit);
  }

  /**
   * Obtiene todos los libros escritos por un autor específico con paginación.
   * 
   * @param {number} id - ID del autor a filtrar
   * @param {number} page - Página solicitada (basada en 1)
   * @param {number} limit - Cantidad de libros por página
   * @returns {Promise<{ books: BookDTO[], total: number }>} Lista de libros paginados y total de registros
   */
  @Get('/with_author/:id')
  @ApiOperation({ summary: 'Listar Todos los Libros de un mismo autor.' })
  @ApiParam({ name: 'id', type: Number })
  @ApiQuery({ name: 'page', type: Number, required: false, description: 'Página solicitada (basada en 1)', example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, description: 'Cantidad de libros por página', example: 10 })
  @ApiResponse({ status: 200, description: 'Lista de Todos los Libros de un mismo autor.', type: Object })
  async getBooksByAuthor(
    @Param('id', ParseIntPipe) id: number,
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10
  ): Promise<{ books: BookDTO[], total: number }> {
    return this.booksService.findAllByAuthor(id, page, limit);
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
  async update(@Param('id', ParseIntPipe) id: number, @Body() bookDTO: CreateBookDTO & { existingImage?: string }, @UploadedFile() file: Express.Multer.File) {

    if (typeof bookDTO.subscriber_exclusive === 'string') {
      bookDTO.subscriber_exclusive = bookDTO.subscriber_exclusive === 'true';
    }

    if (file?.filename) {
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
   * Elimina un libro del sistema (soft delete).
   * 
   * @param {number} id - ID del libro a eliminar
   * @returns {Promise<boolean>} Resultado de la operación:
   * - true si el libro fue eliminado
   * - false si el libro no existía
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar Libro (Soft Delete)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Libro Eliminado (Soft Delete)' })
  delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.booksService.delete(id);
  }

  /**
   * Elimina un libro del sistema (hard delete).
   * 
   * @param {number} id - ID del libro a eliminar
   * @returns {Promise<boolean>} Resultado de la operación:
   * - true si el libro fue eliminado
   * - false si el libro no existía
   */
  @Delete('/hard/:id')
  @ApiOperation({ summary: 'Eliminar Libro (Hard Delete)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Libro Eliminado (Hard Delete)' })
  deleteSQL(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.booksService.deleteSQL(id);
  }
}