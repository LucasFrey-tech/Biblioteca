import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';
import { Genre } from 'src/entidades/genre.entity';

/**
 * DTO para la respuesta paginada de géneros.
**/

export class PaginatedGenresDTO {
    /**
     * Lista de géneros
     * @type { Genre[] }
     */
    @ApiProperty({ type: [Genre], description: 'Lista de géneros' }) 
    genres: Genre[];
    
    /**
     * Total de géneros disponibles
     * @type {number} 
     */
    @ApiProperty({ example: 100, description: 'Total de géneros disponibles' }) 
    @IsInt() 
    @Min(0) 
    total: number;
}