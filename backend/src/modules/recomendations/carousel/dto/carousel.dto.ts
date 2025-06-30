import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

/**
 * Data Transfer Object (DTO) para carousel
 * Esta clase se usa para validar y transformar datos entre el cliente y el servidor.
 */
export class CarouselDTO {
    /**
     * ID del carousel
     * @type {number}
     */
    @ApiProperty({ example: 1, description: "ID Único del Carousel" })
    @IsNumber()
    @IsOptional()
    id?: number;

    /**
     * ID del libro
     * @type {number}
     */
    @ApiProperty({ example: 1, description: "ID Único del Libro" })
    @IsNumber()
    idBook: number;

    /**
     * Imágen del carousel
     * @type {string}
     */
    @ApiProperty({ example: "imagen.png", description: "Imagen" })
    @IsString()
    @IsOptional()
    image?: string;
}