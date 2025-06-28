import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';
import { Author } from 'src/entidades/author.entity';
/**
 * DTO para la respuesta paginada de autores.
 */
export class PaginatedAuthorsDTO {
  /**
   * Lista de autores
   * @type {Author[]}
   */
  @ApiProperty({ type: [Author], description: 'Lista de autores' })
  authors: Author[];

  /**
   * Total de autores disponibles
   * @type {number}
   */
  @ApiProperty({ example: 100, description: 'Total de autores disponibles' })
  @IsInt()
  @Min(0)
  total: number;
}