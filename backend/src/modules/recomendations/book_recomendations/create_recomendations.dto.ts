import { IsNumber } from "class-validator";

/**
 * DTO para la creación de una nueva recomendación.
 */
export class CreateRecommendationDTO {

    /**
     *  ID del libro recomendado
     * @type {number} 
     */
    @IsNumber()
    idBook: number;

    /**
     * Constructor del DTO.
     */
    constructor( idBook: number) { this.idBook = idBook }
}