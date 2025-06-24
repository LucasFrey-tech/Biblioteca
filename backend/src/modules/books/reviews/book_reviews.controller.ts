import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, Req } from '@nestjs/common';
import { BookReviewsService } from './book_reviews.service';
import { Review } from 'src/entidades/review.entity';
import { ReviewI } from './dto/review.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateReviewDto } from './dto/createReview.dto';

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
    @ApiOperation({ summary: 'Crear Crítica' })
    @ApiBody({ type: CreateReviewDto })
    @ApiResponse({ status: 201, description: 'Crítica creada' })
    async create(@Body() reviewData: CreateReviewDto, @Req() req) {
        
        const idUser = req.user?.id;

        return this.reviewService.create(reviewData, idUser);
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