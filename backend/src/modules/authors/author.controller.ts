import { Controller, Get, Param, Delete, Post, Body, ParseIntPipe, ValidationPipe } from "@nestjs/common";
import { AuthorService } from "./author.service";
import { Author } from "src/entidades/author.entity";
import { CreateAuthorDto } from "src/modules/authors/crear-autor.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Autores')
@Controller('authors')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) {}

    @Get()
    @ApiOperation({ summary: 'Listar Todos los Autores' })
    @ApiResponse({ status: 200, description: 'Lista de Autores', type: [Author] })
    findAll() {
        return this.authorService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener Autor por ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Autor Encontrado', type: Author})
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.authorService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Crear Autor' })
    @ApiBody({ type: CreateAuthorDto })
    @ApiResponse({ status: 201, description: 'Autor creado', type: Author })
    create(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
        return this.authorService.create(createAuthorDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar Autor' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Autor Eliminado' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.authorService.remove(id);
    }
}
