import { Controller, Get, Param } from '@nestjs/common';
import { LibraryBooksService } from './library_books.service';
import { LibraryBookDTO } from './library_book.dto';

@Controller('library_books')
export class LibraryBooksController {
    constructor(private readonly booksService: LibraryBooksService) {}
        
    @Get()
    findAll(): Promise<LibraryBookDTO[]> {
        return this.booksService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<LibraryBookDTO | null> {
        return this.booksService.findOne(id);
    }
}