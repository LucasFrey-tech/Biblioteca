import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BookContentService } from './book_content.service';
import { BookContentDTO } from './dto/book_content.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('book/content')
export class BookContentController {
    constructor(private readonly bookContentService: BookContentService) { }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener contenido de Libro Virtual por ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Contenido de Libro Virtual Encontrado', type: BookContentDTO })
    async get(@Param('id', ParseIntPipe) id: number): Promise<BookContentDTO | null> {
        return await this.bookContentService.get(id);
    }

    @Post()
    @ApiOperation({ summary: 'Subir a la base contenido de un libro virtual.' })
    @ApiBody({ type: BookContentDTO })
    @ApiResponse({ status: 201, description: 'Contenido creado.', type: BookContentDTO })
    @UseInterceptors(FileInterceptor('content'))
    async post(@Body() bookContent: Partial<BookContentDTO>, @UploadedFile() file: Express.Multer.File): Promise<BookContentDTO> {
        if (file) {
            bookContent.content = this.bookContentService.bookContentUrl(file.originalname);
        }

        return await this.bookContentService.create(bookContent);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Editar contenido de un libro virtual.' })
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({ type: BookContentDTO })
    @ApiResponse({ status: 200, description: 'Contenido de un libro virtual editado', type: BookContentDTO })
    @UseInterceptors(FileInterceptor('content'))
    update(@Param('id', ParseIntPipe) id: number, @Body() bookContent: BookContentDTO & { existingImage?: string }, @UploadedFile() file: Express.Multer.File) {
        if (file && file.originalname) {
            bookContent.content = this.bookContentService.bookContentUrl(file.originalname);
        } else if (bookContent.existingImage) {
            bookContent.content = bookContent.existingImage;
        } else {
            bookContent.content = '';
        }
        return this.bookContentService.update(id, bookContent);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar contenido de un libro virtual.' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Contenido de un libro virtual eliminado' })
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.bookContentService.delete(id);
    }
}