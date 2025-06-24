import { IsInt, IsString, IsNumber } from "class-validator";

export class CreateReviewDto {
  @IsInt()
  id_user: number;

  @IsInt()
  id_book: number;

  @IsString()
  comment: string;

  @IsNumber()
  rating: number;

    constructor(
        id_user: number,
        id_book: number,
        comment: string,
        rating: number,
    ) { this.id_user = id_user, this.id_book = id_book, this.comment = comment, this.rating = rating }
};