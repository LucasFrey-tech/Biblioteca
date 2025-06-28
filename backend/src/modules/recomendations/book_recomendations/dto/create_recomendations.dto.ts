import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

/**
 * DTO para la creación de una nueva recomendación.
 */
export class CreateRecommendationDTO {

    /**
     *  ID del libro recomendado
     * @type {number} 
     */
    @ApiProperty({example: 1, description: "ID Único del Libro"})
    @IsNumber()
    idBook: number;

    /**
     * Constructor del DTO.
     */
    constructor( idBook: number) { this.idBook = idBook }
}