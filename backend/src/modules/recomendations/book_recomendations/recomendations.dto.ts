import { IsNumber, IsString } from "class-validator";
import { BookRecommendation } from "src/entidades/book_recommendations.entity";

export class RecommendationDTO {

    /** ID de la recomendación */
    @IsNumber()
    id: number

    /** ID del libro recomendado */
    @IsNumber()
    idBook: number;
    
    /** Título del libro recomendado */
    @IsString()
    title: string;
    
    /** Nombre del autor del libro recomendado */
    @IsString()
    author: string;
    
    /** Imagen del libro recomendado */
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