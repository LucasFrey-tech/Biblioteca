import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RecomendationsService } from "./recomendations.service";
import { RecommendationDTO } from "./recomendations.dto";
import { CreateRecommendationDTO } from "./create_recomendations.dto";

/**
 * Controlador para gestionar las operaciones de las recomendaciones de los libros.
 * Proporciona endpoints para crear, leer, actualizar y eliminar libros,
 */
@ApiTags('Recomendations')
@ApiBearerAuth()
@Controller('news/recomendations')
export class RecomendationsController {
    constructor(private readonly recomendationsService: RecomendationsService) {}
    
    /**
     * Obtiene todas las recomendaciones
     * 
     * @returns {Promise<RecommendationDTO[]>} lista de recomendaciones en formato DTO
     */
    @Get()
    @ApiOperation({ summary: 'Listar Todas las recomendaciones' })
    @ApiResponse({ status: 200, description: 'Lista de recomendaciones.', type: [RecommendationDTO] })
    findAll(): Promise<RecommendationDTO[]> {
        return this.recomendationsService.findAll();
    }

    /**
     * Obtiene una recomendación específica por su ID.
     * 
     * @param {number} id - ID de la recomendación a buscar 
     * @returns {Promise<RecommendationDTO>} Recomendación encontrada
     */
    @Get(':id')
    @ApiOperation({ summary: 'Obtener recomendacion por ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Recomendacion encontrada.', type: RecommendationDTO})
    findOne(@Param('id') id: number): Promise<RecommendationDTO> {
        return this.recomendationsService.findOne(id);
    }


    /**
     * Crea una nueva recomendación de libro en el sistema
     * 
     * @param {CreateRecommendationDTO} body - Datos de la recomendacion a crear
     * @returns {Promise<RecommendationDTO>} - Recomendación creada
     */
    @Post()
    @ApiOperation({ summary: 'Crear Recomendacion' })
    @ApiBody({ type: CreateRecommendationDTO })
    @ApiResponse({ status: 201, description: 'Recomendacion creada.', type: RecommendationDTO })
    create(@Body() body: CreateRecommendationDTO): Promise<RecommendationDTO> {
        return this.recomendationsService.create(body);
    }

    /**
     * Actualiza una recomendación existente
     * 
     * @param {number} id - ID de la recomendacion a actualizar 
     * @param {CreateRecommendationDTO} body - Datos actualizados de la recomendacion
     * @returns {Promise<RecommendationDTO>} Recomendación actualizada
     */
    @Put(':id')
    @ApiOperation({ summary: 'Actualizar Recomendacion' })
    @ApiBody({ type: CreateRecommendationDTO })
    @ApiResponse({ status: 201, description: 'Recomendacion actualizada.', type: RecommendationDTO })
    update(@Param('id', ParseIntPipe) id: number, @Body() body: CreateRecommendationDTO): Promise<RecommendationDTO> {
        return this.recomendationsService.update(id, body);
    }

    /**
     * Elimina una actualizacion del sistema
     * 
     * @param {number} id - ID de la recomendación a eliminar
     * @returns {Promise<void>} - Recomendación eleiminada
     */
    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar Recomendacion' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Recomendacion eliminada.' })
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.recomendationsService.remove(id);
    }
}