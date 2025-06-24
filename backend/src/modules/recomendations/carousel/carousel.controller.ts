import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CarouselService } from "./carousel.service";
import { CarouselDTO } from "./carousel.dto";
import { FileInterceptor } from "@nestjs/platform-express";

/**
 * Controlador para gestionar las operaciones del carousel.
 * Proporciona endpoints para, crear, leer, actualizar y eliminar un carousel.
 */
@ApiTags('Carousel')
@ApiBearerAuth()
@Controller('news/carousel')
export class CarouselController {
    constructor(private readonly carouselService: CarouselService) { }

    /**
     * Obtiene todos los carousel
     * 
     * @returns {Promise<CarouselDTO[]>} lista de carousel en formato DTO
     */
    @Get()
    @ApiOperation({ summary: 'Listar Carousel' })
    @ApiResponse({ status: 200, description: 'Lista de items en el Carousel.', type: [CarouselDTO] })
    findAll(): Promise<CarouselDTO[]> {
        return this.carouselService.findAll();
    }

    /**
     * Crea un nuevo carousel en el sistema.
     * 
     * @param {CarouselDTO} body - Datos del carousel a crear
     * @param {Express.Multer.File} file - Imágen del carousel
     * @returns {Promise<CarouselDTO>} - Carousel creado
     */
    @Post()
    @ApiOperation({ summary: 'Añadir item del carousel' })
    @ApiBody({ type: CarouselDTO })
    @ApiResponse({ status: 201, description: 'Item del carousel añadido.', type: CarouselDTO })
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() body: CarouselDTO, @UploadedFile() file: Express.Multer.File): Promise<CarouselDTO> {
        body.image = this.carouselService.bookImageUrl(file.originalname);
        return this.carouselService.create(body);
    }

    /**
     * Actualiza un carousel existente
     * 
     * @param {number} id - ID del carousel a actualizar
     * @param {Partial<CarouselDTO>} updateData - Datos actualizados del carousel
     * @returns {Promise<Carousel>} - Carousel actualizado
     */
    @Put(':id')
    @ApiOperation({ summary: 'Actualizar CarouselItem' })
    @ApiParam({ name: 'idBookCart', type: Number })
    @ApiBody({ type: CarouselDTO })
    @ApiResponse({ status: 200, description: 'CarouselItem Actualizado', type: CarouselDTO })
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateData: Partial<CarouselDTO>,
    ) {
        return this.carouselService.update(id, updateData);
    }

    /**
     * Elimina un carousel del sistema
     * 
     * @param {number} id - ID del carousel a eliminar
     * @returns {Promise<void>} - Carousel eliminado
     */
    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar Item del Carousel' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Item del carousel eliminado.' })
    remove(@Param('id') id: number): Promise<void> {
        return this.carouselService.remove(id);
    }
}