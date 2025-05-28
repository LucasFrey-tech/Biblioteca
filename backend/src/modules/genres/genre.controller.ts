import { Controller, Get, Post, Body } from '@nestjs/common';
import { GenresService } from './genre.service';
import { Genre } from 'src/entidades/genre.entity';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  findAll(): Promise<Genre[]> {
    return this.genresService.findAll();
  }

  @Post()
  create(@Body() newGenre: Partial<Genre>): Promise<Genre> {
    return this.genresService.create(newGenre);
  }
}