import { IsNumber, IsString } from "class-validator";

export class BookGenreDto {
    @IsNumber()
    id_book: number;
    
    @IsString()
    name: string;
    
    constructor(
        id_book: number,
        name: string,
    ) {
        this.id_book = id_book,
        this.name = name
    }
}