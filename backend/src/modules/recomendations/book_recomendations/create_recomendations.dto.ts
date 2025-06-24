import { IsNumber } from "class-validator";

/**
 * DTO para la creación de una nueva recomendación.
 * Contiene validaciones para los campos del cuerpo de la petición.
 */
export class CreateRecommendationDTO {

    /** ID del libro recomendado */
    @IsNumber()
    idBook: number;

    /**
     * Constructor del DTO.
     */
    constructor( idBook: number) { this.idBook = idBook }
}