import { Controller, Get, Param } from '@nestjs/common';
import { CatalogueBooksService } from './catalogue_books.service';
import { CatalogueBookDTO } from './catalogue_book.dto';

@Controller('catalogue_books')
export class CatalogueBooksController {
    constructor(private readonly booksService: CatalogueBooksService) {}
    
    @Get()
    findAll(): Promise<CatalogueBookDTO[]> {

    return this.booksService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<CatalogueBookDTO | null>  {
    return this.booksService.findOne(id);
    }
}