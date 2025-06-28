import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, Query } from '@nestjs/common';
import { BookReviewsService } from './book_reviews.service';
import { Review } from '../../../../src/entidades/review.entity';
import { ReviewI } from './dto/review.dto';
import { PaginatedReviewDTO } from "./dto/reviewPAG.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { CreateReviewDto } from './dto/createReview.dto';

/**
 * Controlador para gestionar las operaciones de las reseñas.
 * Proporciona endpoints para crear, leer, actualizar y eliminar reseñas,
 * así como para obtener reseñas filtradas por usuario o libro.
 */
@ApiTags('Críticas')
@Controller('reviews')
export class BookReviewsController {
    constructor(private readonly reviewService: BookReviewsService) { }

    /**
     * Obtiene todas las reseñas disponibles en el sistema.
     * 
     * @returns {Promise<ReviewI[]>} Lista de reseñas.
     */
    @Get()
    @ApiOperation({ summary: 'Listar Todas las Críticas' })
    @ApiResponse({ status: 200, description: 'Lista de Críticas', type: [ReviewI] })
    async findAll(): Promise<ReviewI[]> {
        return this.reviewService.findAll();
    }

    /**
     * Obtiene todas las reseñas disponibles con paginación.
     * 
     * @param {number} page - Página solicitada (basada en 1)
     * @param {number} limit - Cantidad de reseñas por página
     * @returns {Promise<PaginatedReviewDTO>} Lista de reseñas paginada
     */
    @Get('paginated')
    @ApiOperation({ summary: 'Listar Críticas Paginadas' })
    @ApiQuery({ name: 'page', type: Number, required: false, description: 'Página solicitada (basada en 1)', example: 1 })
    @ApiQuery({ name: 'limit', type: Number, required: false, description: 'Cantidad de reseñas por página', example: 10 })
    @ApiResponse({ status: 200, description: 'Lista de Críticas Paginada', type: PaginatedReviewDTO })
    async findAllPaginated(
        @Query('page', ParseIntPipe) page: number = 1,
        @Query('limit', ParseIntPipe) limit: number = 10
    ): Promise<PaginatedReviewDTO> {
        return this.reviewService.findAllPaginated(page, limit);
    }

    /**
     * Obtiene una reseña específica por su ID.
     * 
     * @param {number} id - ID de la reseña a buscar
     * @returns {Promise<Review>} - Reseña encontrada
     */
    @Get(':id')
    @ApiOperation({ summary: 'Obtener una Crítica por ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Crítica Encontrada', type: Review })
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Review> {
        return this.reviewService.findOne(id);
    }

    /**
     * Obtiene todas las reseñas de un libro específico
     * 
     * @param {number} bookId - ID del libro a filtrar.
     * @returns {Promise<ReviewI[]>} - Lista de reseñas del libro específico.
     */
    @Get('book/:bookId')
    @ApiOperation({ summary: 'Listar Críticas por ID de Libro' })
    @ApiParam({ name: 'bookId', type: Number })
    @ApiResponse({ status: 200, description: 'Lista de Críticas por ID de Libro', type: [ReviewI] })
    async findReviewsByBookId(@Param('bookId', ParseIntPipe) bookId: number): Promise<ReviewI[]> {
        return this.reviewService.findReviewsByBookId(bookId);
    }

    /**
     * Crea una nueva reseña en el sistema
     * 
     * @param {CreateReviewDto} reviewData - Datos de la reseña a crear.
     * @returns {Promise<ReviewI>} - Reseña creada.
     */
    @Post()
    @ApiOperation({ summary: 'Crear Crítica' })
    @ApiBody({ type: CreateReviewDto })
    @ApiResponse({ status: 201, description: 'Crítica creada' })
    async create(@Body() reviewData: CreateReviewDto): Promise<ReviewI> {
        return this.reviewService.create(reviewData);
    }

    /**
     * Actualiza una reseña existente
     * 
     * @param {number} id - ID de la reseña a actualizar.
     * @param {ReviewI} reviewData - Datos actualizados de la reseña.
     * @returns {Promise<Review>} - Reseña actualizada.
     */
    @Put(':id')
    @ApiOperation({ summary: 'Actualizar Crítica' })
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({ type: ReviewI })
    @ApiResponse({ status: 200, description: 'Crítica Actualizada', type: Review })
    async update(@Param('id', ParseIntPipe) id: number, @Body() reviewData: ReviewI) {
        return this.reviewService.update(id, reviewData);
    }

    /**
     * Elimina una reseña de la base de datos
     * 
     * @param {number} id - ID de la reseña a eliminar.
     * @returns - Reseña eliminada.
     */
    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar Crítica por ID de Crítica' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Crítica Eliminada' })
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.reviewService.remove(id);
    }
}