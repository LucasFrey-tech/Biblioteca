import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';
import { CatalogueBookDTO } from './catalogue_book.dto';

/**
 * DTO para la respuesta paginada de libros del catálogo.
 */
export class PaginatedCatalogueBooksDTO {
  /**
   * Lista de libros del catálogo
   * @type {CatalogueBookDTO[]}
   */
  @ApiProperty({ type: CatalogueBookDTO, isArray: true, description: 'Lista de libros del catálogo' })
  books: CatalogueBookDTO[];

  /**
   * Total de libros disponibles en el catálogo
   * @type {number}
   */
  @ApiProperty({ example: 100, description: 'Total de libros disponibles en el catálogo' })
  @IsInt()
  @Min(0)
  total: number;
}