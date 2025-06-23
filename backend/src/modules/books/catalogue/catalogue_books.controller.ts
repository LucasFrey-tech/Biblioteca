import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CatalogueBooksService } from './catalogue_books.service';
import { CatalogueBookDTO } from './catalogue_book.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Libros de Catalogo')
@Controller('catalogue_books')
export class CatalogueBooksController {
    constructor(private readonly booksService: CatalogueBooksService) {}
    
    @Get()
    @ApiOperation({ summary: 'Listar Todos los Libros de Catalogo' })
    @ApiResponse({ status: 200, description: 'Lista de Todos los Libros de catalogo', type: [CatalogueBookDTO] })
    findAll(): Promise<CatalogueBookDTO[]> {
        return this.booksService.findAll();
    }


    @Get(':id')
    @ApiOperation({ summary: 'Obtener Libro de Catalogo por ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Libro Encontrado', type: CatalogueBookDTO })
    findOne(@Param('id', ParseIntPipe) id: number): Promise<CatalogueBookDTO | null>  {
        return this.booksService.findOne(id);
    }
}