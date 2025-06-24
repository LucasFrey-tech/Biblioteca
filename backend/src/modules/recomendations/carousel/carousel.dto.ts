import { IsNumber, IsString } from "class-validator";

/**
 * Data Transfer Object (DTO) para carousel
 * Esta clase se usa para validar y transformar datos entre el cliente y el servidor, incluyendo validaciones.
 */
export class CarouselDTO {
    /**
     * ID del carousel
     * @type {number}
     */
    @IsNumber()
    id: number;

    /**
     * ID del libro
     * @type {number}
     */
    @IsNumber()
    idBook: number;

    /**
     * Imágen del carousel
     * @type {string}
     */
    @IsString()
    image!: string;
}