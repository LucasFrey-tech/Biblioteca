import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Author } from 'src/entidades/author.entity';
import { AuthorService } from './author.service';


@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  findAll(): Promise<Author[]> {
    return this.authorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Author> {
    return this.authorService.findOne(id);
  }

  @Post()
  create(@Body() newAuthor: Partial<Author>): Promise<Author> {
    return this.authorService.create(newAuthor);
  }
}