import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CarouselService } from "./carousel.service";
import { CarouselDTO } from "./carousel.dto";
import { FileInterceptor } from "@nestjs/platform-express";


@ApiTags('Carousel')
@ApiBearerAuth()
@Controller('carousel')
export class CarouselController {
    constructor(private readonly carouselService: CarouselService) {}
        
        @Get()
        @ApiOperation({ summary: 'Listar Carousel' })
        @ApiResponse({ status: 200, description: 'Lista de items en el Carousel.', type: [CarouselDTO] })
        findAll() {
            return this.carouselService.findAll();
        }
    
        @Get(':id')
        @ApiOperation({ summary: 'Obtener item del carousel por ID' })
        @ApiParam({ name: 'id', type: String })
        @ApiResponse({ status: 200, description: 'Item encontrado.', type: CarouselDTO})
        findOne(@Param('id') id: string) {
            return this.carouselService.findOne(+id);
        }
    
        @Post()
        @ApiOperation({ summary: 'Añadir item del carousel' })
        @ApiBody({ type: CarouselDTO })
        @ApiResponse({ status: 201, description: 'Item del carousel añadido.', type: CarouselDTO })
        @UseInterceptors(FileInterceptor('image'))
        create(@Body() body: CarouselDTO, @UploadedFile() file: Express.Multer.File): Promise<CarouselDTO> {
            body.image = this.carouselService.bookImageUrl(file.originalname);
            return this.carouselService.create(body);
        }
    
        @Delete(':id')
        @ApiOperation({ summary: 'Eliminar Item del Carousel' })
        @ApiParam({ name: 'id', type: String })
        @ApiResponse({ status: 200, description: 'Item del carousel eliminado.' })
        remove(@Param('id') id: string) {
            return this.carouselService.remove(+id);
        }
}