import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { LibraryBooksService } from './library_books.service';
import { LibraryBookDTO } from './dto/library_book.dto';
import { UserVirtualBooks } from '../../../entidades/user_virtual_books.entity';
import { CreateUserVirtualBookDto } from './dto/library_book_create.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';

@ApiTags('Libros de Biblioteca')
@Controller('library_books')
export class LibraryBooksController {
    constructor(private readonly libraryBooksService: LibraryBooksService) { }

    @Get(':idUser/paginated')
    @ApiOperation({ summary: 'Listar Libros de Biblioteca Paginados por Usuario' })
    @ApiParam({ name: 'idUser', type: Number, description: 'ID del usuario' })
    @ApiQuery({ name: 'page', type: Number, required: false, description: 'Número de página', example: 1 })
    @ApiQuery({ name: 'limit', type: Number, required: false, description: 'Límite de libros por página', example: 10 })
    @ApiResponse({ status: 200, description: 'Lista de Libros de Biblioteca Paginada', schema: {
        example: {
            items: [
                {
                    id: 42,
                    title: 'El Hobbit',
                    author_id: 7,
                    description: 'Una aventura épica de fantasía en la Tierra Media.',
                    genre: [
                        { id: 1, name: 'Fantasía' },
                        { id: 3, name: 'Aventura' }
                    ],
                    isbn: '978-84-450-7255-5',
                    image: 'hobbit.jpg',
                }
            ],
            total: 1,
        }
    } })
    async findAllByUserPaginated(
        @Param('idUser', ParseIntPipe) idUser: number,
        @Query('page', ParseIntPipe) page: number = 1,
        @Query('limit', ParseIntPipe) limit: number = 10,
    ): Promise<{ items: LibraryBookDTO[]; total: number }> {
        return this.libraryBooksService.findAllByUserPaginated(idUser, page, limit);
    }

    @Get(':idUser')
    @ApiOperation({ summary: 'Listar Todos los Libros de Biblioteca' })
    @ApiResponse({ status: 200, description: 'Lista de Libros de Biblioteca', type: [LibraryBookDTO] })
    findAllByUser(@Param('idUser', ParseIntPipe) idUser: number): Promise<LibraryBookDTO[]> {
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