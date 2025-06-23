import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { GenresService } from './genre.service';
import { Genre } from 'src/entidades/genre.entity';
import { ApiTags, ApiOperation, ApiResponse,ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Generos')
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  @ApiOperation({ summary: 'Listar Todos los Generos' })
  @ApiResponse({ status: 200, description: 'Lista de Generos', type: [Genre] })
  findAll(): Promise<Genre[]> {
    return this.genresService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear Genero' })
  @ApiBody({ type: Genre })
  @ApiResponse({ status: 201, description: 'Genero Creado', type: Genre })
  create(@Body() newGenre: Partial<Genre>): Promise<Genre> {
    return this.genresService.create(newGenre);
  }
   @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un Genero por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del género a eliminar' })
  @ApiResponse({ status: 200, description: 'Género eliminado correctamente' })
  delete(@Param('id') id: number): Promise<void> {
    return this.genresService.delete(id);
  }
}
