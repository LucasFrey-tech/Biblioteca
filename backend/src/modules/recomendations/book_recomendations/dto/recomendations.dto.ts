import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { BookRecommendation } from "src/entidades/book_recommendations.entity";

/**
 * Data Transfer Object (DTO) para Recomendations
 * Esta clase se usa para validar y transformar datos entre el cliente y el servidor.
 */
export class RecommendationDTO {

    /** 
     * ID de la recomendación
     * @type {number} 
    */
    @ApiProperty({example: 1, description: "ID Único de la Recomendación"})
    @IsNumber()
    id: number

    /**
     * ID del libro recomendado
     *  @type {number} 
     */
    @ApiProperty({example: 1, description: "ID Único del Libro"})
    @IsNumber()
    idBook: number;
    
    /** 
     * Título del libro recomendado
     * @type {string} 
    */
    @ApiProperty({example: "Harry Potter", description: "Titulo del Libro"})
    @IsString()
    title: string;
    
    /** 
     * Nombre del autor del libro recomendado
     * @type {string} 
     */
    @ApiProperty({example: "J.K Rowling", description: "Nombre del Autor"})
    @IsString()
    author: string;
    
    /** 
     * Imagen del libro recomendado
     * @type {string} 
     */
    @ApiProperty({example: "imagen.png", description: "Imagen del Libro"})
    @IsString()
    image: string;

    /**
     * Constructor del DTO.
     */
    constructor(bookRecomendation: BookRecommendation){
        this.id = bookRecomendation.id
        this.idBook = bookRecomendation.book.id
        this.title = bookRecomendation.book.title
        this.author = bookRecomendation.book.author.name
        this.image = bookRecomendation.book.image
    }
}