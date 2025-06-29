import { ApiProperty } from "@nestjs/swagger";
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
    @ApiProperty({ example: 42, description: 'ID único de la reseña' })
    @IsInt()
    id: number;

    /**
     * ID del usuario de la reseña.
     * @type {number}
     */
    @ApiProperty({ example: 7, description: 'ID del usuario que hizo la reseña' })
    @IsInt()
    id_user: number;

    /**
     * ID del libro de la reseña.
     * @type {number}
     */
    @ApiProperty({ example: 15, description: 'ID del libro al que pertenece la reseña' })
    @IsInt()
    id_book: number;

    /**
     * Alias del usuario de la reseña
     * @type {number}
     */
    @ApiProperty({ example: 'Tukson', description: 'Alias (username) del usuario que reseñó' })
    @IsString()
    username: string;

    /**
     * Contenido de la reseña.
     * @type {number}
     */
    @ApiProperty({
        example: 'Un relato atrapante de principio a fin.',
        description: 'Contenido escrito de la reseña',
    })
    @IsString()
    comment: string;

    /**
     * Calificación de la reseña
     * @type {number}
     */
    @ApiProperty({ example: 4.5, description: 'Calificación otorgada al libro (1‑5 o 0‑5)' })
    @IsNumber()
    rating: number;

    /**
     * Fecha de creación de la reseña.
     * @type {number}
     */
    @ApiProperty({
        example: '2025-06-28T19:00:00.000Z',
        description: 'Fecha de creación de la reseña en formato ISO',
    })
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
    ) {
        this.id = id;
        this.id_user = id_user;
        this.id_book = id_book;
        this.username = username;
        this.comment = comment;
        this.rating = rating;
        this.reviewDate = reviewDate;
    }
};