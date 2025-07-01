import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsNumber } from "class-validator";

/**
 * DTO para la creación de una nueva reseña.
 * Contiene validaciones para los campos del cuerpo de la petición.
 */
export class CreateReviewDto {

  /**
   * ID del usuario la reseña.
   * @type {number}
   */
  @ApiProperty({ example: 7, description: 'ID del usuario que crea la reseña' })
  @IsInt()
  id_user: number;


  /**
   * ID del libro de la reseña.
   * @type {number}
   */
  @ApiProperty({ example: 15, description: 'ID del libro al que pertenece la reseña' })
  @IsInt()
  id_book: number;

  /**
   * Contenido de la reseña.
   * @type {string}
   */
  @ApiProperty({
    example: 'Una historia atrapante; me encantó la narrativa.',
    description: 'Texto de la reseña',
  })
  @IsString()
  comment: string;

  /**
   * Calificación de la reseña.
   * @type {number}
   */
  @ApiProperty({
    example: 4.5,
    description: 'Calificación otorgada al libro (rango 0‑5)',
  })
  @IsNumber()
  rating: number;

  /**
   * Constructor del DTO.
   */
  constructor(
    id_user: number,
    id_book: number,
    comment: string,
    rating: number,
  ) {
    this.id_user = id_user;
    this.id_book = id_book;
    this.comment = comment;
    this.rating = rating;
  }
};