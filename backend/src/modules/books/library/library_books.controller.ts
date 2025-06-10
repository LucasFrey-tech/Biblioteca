import { Controller, Get, Param } from '@nestjs/common';
import { LibraryBooksService } from './library_books.service';
import { LibraryBookDTO } from './library_book.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Libros de Biblioteca')
@Controller('library_books')
export class LibraryBooksController {
    constructor(private readonly libraryBooksService: LibraryBooksService) {}
        
    @Get(':idUser')
    @ApiOperation({ summary: 'Listar Todos los Libros de Biblioteca' })
    @ApiResponse({ status: 200, description: 'Lista de Libros de Biblioteca', type: [LibraryBookDTO] })
    findAllByUser(@Param('idUser') idUser: number): Promise<LibraryBookDTO[]> {
        console.log("AHHHHHHHHHHHHHHH 2");
        return this.libraryBooksService.findAllByUser(idUser);
    }

    // @Get(':id')
    // @ApiOperation({ summary: 'Obtener Libro de Biblioteca por ID' })
    // @ApiParam({ name: 'id', type: Number })
    // @ApiResponse({ status: 200, description: 'Libro Encontrado', type: LibraryBookDTO })
    // findOne(@Param('id') id: number): Promise<LibraryBookDTO | null> {
    //     return this.libraryBooksService.findOne(id);
    // }
}