import { IsInt, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class BookContentDTO{
    @ApiProperty({example: 2, description: "ID Único del Libro"})
    @IsInt()
    idBook:number;

    @ApiProperty({example: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eleifend, felis ut rutrum venenatis, lorem risus maximus tellus, et placerat ante massa placerat diam. Curabitur tincidunt lacus porta tincidunt volutpat. Pellentesque ut interdum dui. Quisque porttitor porta hendrerit. Nam accumsan urna eu enim aliquam, in consequat quam lobortis. Phasellus id laoreet lorem. Nam quis justo urna. Donec sit amet purus ipsum. Donec ullamcorper metus eu eros condimentum tristique. In non ligula vitae augue cursus mattis.", description: "Contenido del Libro"})
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