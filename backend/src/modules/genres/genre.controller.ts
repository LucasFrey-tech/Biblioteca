import { Controller, Get, Post, Body, Delete, Param, ParseIntPipe, Query } from '@nestjs/common';
import { GenresService } from './genre.service';
import { Genre } from '../../../src/entidades/genre.entity';
import { PaginatedGenresDTO } from './dto/genre.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';

/**
 * Controlador para gestionar las operaciones de los géneros.
 * Proporciona endpoints para crear, leer y eliminar géneros,
 */
@ApiTags('Géneros')
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) { }

  /**
   * Obtiene todos los géneros disponibles.
   * 
   * @returns {Promise<Genre[]>} Lista de todos los géneros
   */
  @Get()
  @ApiOperation({ summary: 'Listar Todos los Géneros' })
  @ApiResponse({ status: 200, description: 'Lista de Géneros', type: [Genre] })
  findAll(): Promise<Genre[]> {
    return this.genresService.findAll();
  }

  /**
   * Obtiene todos los géneros disponibles con paginación
   * 
   * @param {number} page - Página solicitada (basada en 1)
   * @param {number} limit - Cantidad de géneros por página
   * @returns {Promise<PaginatedGenresDTO>} Lista de géneros paginados y total de registros
   */
  @Get('paginated')
  @ApiOperation({ summary: 'Listar Géneros Paginados' })
  @ApiQuery({ name: 'page', type: Number, required: false, description: 'Página solicitada (basada en 1)', example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, description: 'Cantidad de géneros por página', example: 10 })
  @ApiResponse({ status: 200, description: 'Lista de Géneros Paginada', type: PaginatedGenresDTO })
  findAllPaginated(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10
  ): Promise<PaginatedGenresDTO> {
    return this.genresService.findAllPaginated(page, limit);
  }

  /**
   * Crea un nuevo género en el sistema
   * 
   * @param {Partial<Genre>} newGenre - Datos del género a crear
   * @returns {Promise<Genre>} - Género creado
   */
  @Post()
  @ApiOperation({ summary: 'Crear Género' })
  @ApiBody({ type: Genre })
  @ApiResponse({ status: 201, description: 'Género Creado', type: Genre })
  create(@Body() newGenre: Partial<Genre>): Promise<Genre> {
    return this.genresService.create(newGenre);
  }

  /**
   * Elimina un género del sistema
   * 
   * @param {number} id - ID del género a eliminar
   * @returns {Promise<void>} - Género eliminado
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un Género por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del género a eliminar' })
  @ApiResponse({ status: 200, description: 'Género eliminado correctamente' })
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.genresService.delete(id);
  }
}