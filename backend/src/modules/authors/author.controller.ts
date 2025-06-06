import { Controller, Get, Param, Delete } from "@nestjs/common";
import { AuthorService } from "./author.service";
import { Author } from "src/entidades/author.entity";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Autores')
@Controller('authors')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) { }

    @Get()
    @ApiOperation({ summary: 'Listar Todos los Autores' })
    @ApiResponse({ status: 200, description: 'Lista de Autores', type: [Author] })
    findAll() {
        return this.authorService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener Autor por ID' })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Autor Encontrado', type: Author})
    findOne(@Param('id') id: string) {
        return this.authorService.findOne(+id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar Autor' })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Autor Eliminado' })
    remove(@Param('id') id: string) {
        return this.authorService.remove(+id);
    }
}