import { Controller, Get, Post, Body, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { GenresService } from './genre.service';
import { Genre } from '../../../src/entidades/genre.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

/**
 * Controlador para gestionar las operaciones de los generos.
 * Proporciona endpoints para crear, leer y eliminar generos,
 */
@ApiTags('Generos')
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) { }

  /**
   * Obtiene todos los generos disponibles en el sistema
   * 
   * @returns {Promise<Genre[]>} Lista de generos en formato DTO
   */
  @Get()
  @ApiOperation({ summary: 'Listar Todos los Generos' })
  @ApiResponse({ status: 200, description: 'Lista de Generos', type: [Genre] })
  findAll(): Promise<Genre[]> {
    return this.genresService.findAll();
  }

  /**
   * Crea un nuevo genero en el sistema
   * 
   * @param {Partial<Genre>} newGenre - Datos del genero a crear
   * @returns {Promise<Genre>} - Genero creado
   */
  @Post()
  @ApiOperation({ summary: 'Crear Genero' })
  @ApiBody({ type: Genre })
  @ApiResponse({ status: 201, description: 'Genero Creado', type: Genre })
  create(@Body() newGenre: Partial<Genre>): Promise<Genre> {
    return this.genresService.create(newGenre);
  }

  /**
   * Eliminar un genero del sistema
   * 
   * @param {number} id - ID del género a eliminar
   * @returns {Promise<void>} - Gérero eliminado
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un Genero por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del género a eliminar' })
  @ApiResponse({ status: 200, description: 'Género eliminado correctamente' })
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.genresService.delete(id);
  }
}
