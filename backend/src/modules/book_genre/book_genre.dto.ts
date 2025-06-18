import { IsNumber, IsString } from "class-validator";

export class BookGenreDto {
    @IsNumber()
    id_genre: number;
    @IsNumber()
    id_book: number;
    
    @IsString()
    name: string;
    
    constructor(
        id_genre: number,
        id_book: number,
        name: string,
    ) {
        this.id_genre = id_genre,
        this.id_book = id_book,
        this.name = name
    }
}