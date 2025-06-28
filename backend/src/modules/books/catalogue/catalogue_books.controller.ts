import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CatalogueBooksService } from './catalogue_books.service';
import { CatalogueBookDTO } from './dto/catalogue_book.dto';
import { PaginatedCatalogueBooksDTO } from './dto/cataloguePAG.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('Libros de Catálogo')
@Controller('catalogue_books')
export class CatalogueBooksController {
    constructor(private readonly booksService: CatalogueBooksService) {}

    /**
     * Obtiene todos los libros del catálogo.
     * 
     * @returns {Promise<CatalogueBookDTO[]>} Lista de todos los libros del catálogo
     */
    @Get()
    @ApiOperation({ summary: 'Listar Todos los Libros de Catálogo' })
    @ApiResponse({ status: 200, description: 'Lista de Todos los Libros de Catálogo', type: [CatalogueBookDTO] })
    findAll(): Promise<CatalogueBookDTO[]> {
        return this.booksService.findAll();
    }

    /**
     * Obtiene todos los libros del catálogo con paginación.
     * 
     * @param {number} page - Página solicitada (basada en 1)
     * @param {number} limit - Cantidad de libros por página
     * @returns {Promise<PaginatedCatalogueBooksDTO>} Lista de libros paginados y total de registros
     */
    @Get('paginated')
    @ApiOperation({ summary: 'Listar Libros de Catálogo Paginados' })
    @ApiQuery({ name: 'page', type: Number, required: false, description: 'Página solicitada (basada en 1)', example: 1 })
    @ApiQuery({ name: 'limit', type: Number, required: false, description: 'Cantidad de libros por página', example: 10 })
    @ApiResponse({ status: 200, description: 'Lista de Libros de Catálogo Paginada', type: PaginatedCatalogueBooksDTO })
    findAllPaginated(
        @Query('page', ParseIntPipe) page: number = 1,
        @Query('limit', ParseIntPipe) limit: number = 10
    ): Promise<PaginatedCatalogueBooksDTO> {
        return this.booksService.findAllPaginated(page, limit);
    }

    /**
     * Obtiene un libro específico del catálogo por su ID.
     * 
     * @param {number} id - ID del libro a buscar.
     * @returns {Promise<CatalogueBookDTO | null>} - Libro encontrado o null.
     */
    @Get(':id')
    @ApiOperation({ summary: 'Obtener Libro de Catálogo por ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Libro Encontrado', type: CatalogueBookDTO })
    findOne(@Param('id', ParseIntPipe) id: number): Promise<CatalogueBookDTO | null> {
        return this.booksService.findOne(id);
    }
}