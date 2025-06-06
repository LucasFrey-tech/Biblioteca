import { Controller, Get, Post, Body } from '@nestjs/common';
import { GenresService } from './genre.service';
import { Genre } from 'src/entidades/genre.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

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
}