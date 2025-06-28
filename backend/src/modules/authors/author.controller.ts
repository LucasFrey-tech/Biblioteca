import { Controller, Get, Param, Delete, Post, Body, ParseIntPipe, ValidationPipe, Query } from "@nestjs/common";
import { AuthorService } from "./author.service";
import { Author } from "../../entidades/author.entity";
import { CreateAuthorDto } from "./dto/crear-autor.dto";
import { PaginatedAuthorsDTO } from "./dto/authorPAG.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';

/**
 * Controlador para gestionar las operaciones de los autores.
 * Proporciona endpoints para crear, leer y eliminar autores.
 */
@ApiTags('Autores')
@Controller('authors')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) {}

    /**
     * Obtiene todos los autores disponibles.
     * 
     * @returns {Promise<Author[]>} Lista de todos los autores
     */
    @Get()
    @ApiOperation({ summary: 'Listar Todos los Autores' })
    @ApiResponse({ status: 200, description: 'Lista de Autores', type: [Author] })
    findAll(): Promise<Author[]> {
        return this.authorService.findAll();
    }

    /**
     * Obtiene todos los autores disponibles con paginación.
     * 
     * @param {number} page - Página solicitada (basada en 1)
     * @param {number} limit - Cantidad de autores por página
     * @returns {Promise<PaginatedAuthorsDTO>} Lista de autores paginados y total de registros
     */
    @Get('paginated')
    @ApiOperation({ summary: 'Listar Autores Paginados' })
    @ApiQuery({ name: 'page', type: Number, required: false, description: 'Página solicitada (basada en 1)', example: 1 })
    @ApiQuery({ name: 'limit', type: Number, required: false, description: 'Cantidad de autores por página', example: 10 })
    @ApiResponse({ status: 200, description: 'Lista de Autores Paginada', type: PaginatedAuthorsDTO })
    findAllPaginated(
        @Query('page', ParseIntPipe) page: number = 1,
        @Query('limit', ParseIntPipe) limit: number = 10
    ): Promise<PaginatedAuthorsDTO> {
        return this.authorService.findAllPaginated(page, limit);
    }

    /**
     * Obtiene un autor específico por su ID.
     * 
     * @param {number} id - ID del autor a buscar.
     * @returns {Promise<Author>} - Autor encontrado.
     */
    @Get(':id')
    @ApiOperation({ summary: 'Obtener Autor por ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Autor Encontrado', type: Author })
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Author> {
        return this.authorService.findOne(id);
    }

    /**
     * Crea un nuevo autor en el sistema
     * 
     * @param {CreateAuthorDto} createAuthorDto - Datos del autor a crear
     * @returns {Promise<Author>} - Autor creado
     */
    @Post()
    @ApiOperation({ summary: 'Crear Autor' })
    @ApiBody({ type: CreateAuthorDto })
    @ApiResponse({ status: 201, description: 'Autor creado', type: Author })
    create(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
        return this.authorService.create(createAuthorDto);
    }

    /**
     * Elimina un autor del sistema
     * 
     * @param {number} id - ID del autor a eliminar
     */
    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar Autor' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Autor Eliminado' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.authorService.remove(id);
    }
}