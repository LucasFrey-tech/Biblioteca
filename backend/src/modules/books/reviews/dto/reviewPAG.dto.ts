import { IsArray, IsInt } from "class-validator";
import { ReviewI } from "./review.dto";
import { ApiProperty } from "@nestjs/swagger";

/**
 * DTO para respuesta paginada de reseñas
 */
export class PaginatedReviewDTO {
  /**
   * Lista de reseñas
   * @type {ReviewI[]}
   */
  @ApiProperty({
    description: 'Lista de reseñas',
    type: [ReviewI],
    example: [
      {
        id: 42,
        id_user: 7,
        id_book: 15,
        username: 'Tukson',
        comment: 'Una reseña muy buena.',
        rating: 4.5,
        reviewDate: '2025-06-28T19:00:00.000Z',
      },
      {
        id: 43,
        id_user: 8,
        id_book: 15,
        username: 'SofiM',
        comment: 'Me encantó el libro, lo recomiendo.',
        rating: 5,
        reviewDate: '2025-06-29T10:00:00.000Z',
      },
    ],
  })
  @IsArray()
  items: ReviewI[];

  /**
   * Total de reseñas
   * @type {number}
   */
  @ApiProperty({ example: 2, description: 'Total de reseñas' })
  @IsInt()
  total: number;

  constructor(items: ReviewI[], total: number) {
    this.items = items;
    this.total = total;
  }
}