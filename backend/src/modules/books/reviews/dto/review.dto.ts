import { IsInt, IsNumber, IsString } from "class-validator";

/**
 * Data Transfer Object (DTO) para Review
 * Se usa para validar y transformar datos entre el cliente y el servidor.
 */
export class ReviewI {

    /**
     * ID de la reseña.
     * @type {number}
     */
    @IsInt()
    id: number;

    /**
     * ID del usuario de la reseña.
     * @type {number}
     */
    @IsInt()
    id_user: number;

    /**
     * ID del libro de la reseña.
     * @type {number}
     */
    @IsInt()
    id_book: number;

    /**
     * Alias del usuario de la reseña
     * @type {number}
     */
    @IsString()
    username: string;

    /**
     * Contenido de la reseña.
     * @type {number}
     */
    @IsString()
    comment: string;

    /**
     * Calificación de la reseña
     * @type {number}
     */
    @IsNumber()
    rating: number;

    /**
     * Fecha de creación de la reseña.
     * @type {number}
     */
    @IsString()
    reviewDate: string;

    /**
     * Constructor del DTO.
     */
    constructor(
        id: number,
        id_user: number,
        id_book: number,
        username: string,
        comment: string,
        rating: number,
        reviewDate: string,
    ) { this.id = id, this.id_user = id_user, this.id_book = id_book, this.username = username, this.comment = comment, this.rating = rating, this.reviewDate = reviewDate }
};