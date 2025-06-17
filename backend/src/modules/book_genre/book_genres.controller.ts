import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { BookGenresService } from './book_genres.service';
import { BookGenre } from 'src/entidades/book_genres.entity';
import { BookGenreDto } from './book_genre.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Generos de Libros')
@Controller('book_genres')
export class BookGenresController {
  constructor(private readonly bookGenresService: BookGenresService) {}

  @Get()
  @ApiOperation({ summary: 'Listar Generos que Corresponden a los Libros' })
  @ApiResponse({ status: 200, description: 'Lista Generos de Libros', type: [BookGenre] })
  async findAll(): Promise<BookGenre[]> {
    return this.bookGenresService.findAll();
  }

  @Post()
  async create(@Body() data: Partial<BookGenreDto>): Promise<BookGenre> {
    return this.bookGenresService.create(data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.bookGenresService.delete(id);
  }
}