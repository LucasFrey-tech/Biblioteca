import { IsInt, IsNumber, IsString } from "class-validator";

export class ReviewI {
    @IsInt()
    id: number;

    @IsInt()
    id_user: number;

    @IsInt()
    id_book: number;

    @IsString()
    username: string;

    @IsString()
    comment: string;

    @IsNumber()
    rating: number;

    @IsString()
    reviewDate: string;

    constructor(
        id: number,
        id_user: number,
        id_book: number,
        username: string,
        comment: string,
        rating: number,
        reviewDate: string,
    ) { this.id = id, this.id_user = id_user, this.id_book = id_book, this.username = username, this.comment = comment, this.rating = rating, this.reviewDate = reviewDate }
};