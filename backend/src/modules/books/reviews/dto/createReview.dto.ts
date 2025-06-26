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
  @IsInt()
  id_user: number;


  /**
   * ID del libro de la reseña.
   * @type {number}
   */
  @IsInt()
  id_book: number;

  /**
   * Contenido de la reseña.
   * @type {string}
   */
  @IsString()
  comment: string;

  /**
   * Calificación de la reseña.
   * @type {number}
   */
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
  ) { this.id_user = id_user, this.id_book = id_book, this.comment = comment, this.rating = rating }
};