import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LibraryBooksService } from './library_books.service';
import { LibraryBookDTO } from './dto/library_book.dto';
import { UserVirtualBooks } from 'src/entidades/user_virtual_books.entity';
import { CreateUserVirtualBookDto } from './dto/library_book_create.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Libros de Biblioteca')
@Controller('library_books')
export class LibraryBooksController {
    constructor(private readonly libraryBooksService: LibraryBooksService) { }

    @Get(':idUser')
    @ApiOperation({ summary: 'Listar Todos los Libros de Biblioteca' })
    @ApiResponse({ status: 200, description: 'Lista de Libros de Biblioteca', type: [LibraryBookDTO] })
    findAllByUser(@Param('idUser') idUser: number): Promise<LibraryBookDTO[]> {
        return this.libraryBooksService.findAllByUser(idUser);
    }

    @Post()
    @ApiOperation({ summary: 'Agregar un libro virtual a la biblioteca de un usuario' })
    @ApiResponse({ status: 201, description: 'Libro agregado exitosamente', type: UserVirtualBooks })
    @ApiBody({ type: CreateUserVirtualBookDto })
    async create(@Body() createUserVirtualBookDto: CreateUserVirtualBookDto): Promise<UserVirtualBooks> {
        return this.libraryBooksService.create(createUserVirtualBookDto);
    }
}
