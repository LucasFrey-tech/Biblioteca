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
    @IsNumber()
    id: number

    /**
     * ID del libro recomendado
     *  @type {number} 
     */
    @IsNumber()
    idBook: number;
    
    /** 
     * Título del libro recomendado
     * @type {string} 
    */
    @IsString()
    title: string;
    
    /** 
     * Nombre del autor del libro recomendado
     * @type {string} 
     */
    @IsString()
    author: string;
    
    /** 
     * Imagen del libro recomendado
     * @type {string} 
     */
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