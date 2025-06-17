import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { BookReviewsService } from './book_reviews.service';
import { Review } from 'src/entidades/review.entity';
import { ReviewI } from './dto/review.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Críticas')
@Controller('reviews')
export class BookReviewsController {
    constructor(private readonly reviewService: BookReviewsService) { }

    @Get()
    @ApiOperation({ summary: 'Listar Todas las Críticas' })
    @ApiResponse({ status: 200, description: 'Lista de Críticas', type: [Review]})
    findAll() {
        return this.reviewService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener una Crítica por ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Crítica Encontrada', type: Review })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.reviewService.findOne(id);
    }


    @Get('book/:bookId')
    @ApiOperation({ summary: 'Listar Críticas por ID de Libro' })
    @ApiParam({ name: 'bookId', type: Number })
    @ApiResponse({ status: 200, description: 'Lista de Críticas por ID de Libro' })
    findReviewsByBookId(@Param('bookId', ParseIntPipe) bookId: number) {
        return this.reviewService.findReviewsByBookId(bookId);
    }

    @Post()
    create(@Body() reviewData: ReviewI){
        return this.reviewService.create(reviewData);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id:number, @Body() reviewData: ReviewI){
        return this.reviewService.update(id, reviewData);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar Crítica por ID de Crítica' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Crítica Eliminada' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.reviewService.remove(id);
    }
}