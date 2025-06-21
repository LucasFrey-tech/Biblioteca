import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RecomendationsService } from "./recomendations.service";
import { RecommendationDTO } from "./recomendations.dto";
import { CreateRecommendationDTO } from "./create_recomendations.dto";


@ApiTags('Recomendations')
@ApiBearerAuth()
@Controller('news/recomendations')
export class RecomendationsController {
    constructor(private readonly recomendationsService: RecomendationsService) {}
    
    @Get()
    @ApiOperation({ summary: 'Listar Todas las recomendaciones' })
    @ApiResponse({ status: 200, description: 'Lista de recomendaciones.', type: [RecommendationDTO] })
    findAll() {
        return this.recomendationsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener recomendacion por ID' })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Recomendacion encontrada.', type: RecommendationDTO})
    findOne(@Param('id') id: string) {
        return this.recomendationsService.findOne(+id);
    }

    @Post()
    @ApiOperation({ summary: 'Crear Recomendacion' })
    @ApiBody({ type: CreateRecommendationDTO })
    @ApiResponse({ status: 201, description: 'Recomendacion creada.', type: RecommendationDTO })
    create(@Body() body: CreateRecommendationDTO): Promise<RecommendationDTO> {
        return this.recomendationsService.create(body);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar Recomendacion' })
    @ApiBody({ type: CreateRecommendationDTO })
    @ApiResponse({ status: 201, description: 'Recomendacion actualizada.', type: RecommendationDTO })
    update(@Param('id') id: string, @Body() body: CreateRecommendationDTO): Promise<RecommendationDTO> {
        return this.recomendationsService.update(Number(id),body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar Recomendacion' })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Recomendacion eliminada.' })
    remove(@Param('id') id: string) {
        return this.recomendationsService.remove(+id);
    }
}