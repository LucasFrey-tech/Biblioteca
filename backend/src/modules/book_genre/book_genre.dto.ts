import { Type } from "class-transformer";
import { IsInt } from "class-validator";

export class BookGenreDto {
    @Type(() => Number)
    @IsInt()
    id_book: number;
    @Type(() => Number)
    @IsInt()
    id_genre: number;
    
    constructor(
        id_book: number,
        id_genre: number,
    ) {
        this.id_book = id_book,
        this.id_genre = id_genre
    }
}