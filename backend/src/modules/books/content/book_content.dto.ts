import { IsInt, IsString } from "class-validator";

export class BookContentDTO{
    @IsInt()
    idBook:number;

    @IsString()
    content:string;

    constructor(
        idBook:number,
        content:string
    ) {
        this.idBook = idBook;
        this.content = content;
    }
}