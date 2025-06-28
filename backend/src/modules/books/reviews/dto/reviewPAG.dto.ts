import { IsArray, IsInt } from "class-validator";
import { ReviewI } from "./review.dto";

/**
 * DTO para respuesta paginada de reseñas
 */
export class PaginatedReviewDTO {
  /**
   * Lista de reseñas
   * @type {ReviewI[]}
   */
  @IsArray()
  items: ReviewI[];

  /**
   * Total de reseñas
   * @type {number}
   */
  @IsInt()
  total: number;

  constructor(items: ReviewI[], total: number) {
    this.items = items;
    this.total = total;
  }
}