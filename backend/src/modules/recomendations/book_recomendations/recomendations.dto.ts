import { BookRecommendation } from "src/entidades/book_recommendations.entity";

export class RecommendationDTO {
    id: number
    idBook: number;
    title: string;
    author: string;
    image: string;

    constructor(bookRecomendation: BookRecommendation){
        this.id = bookRecomendation.id
        this.idBook = bookRecomendation.book.id
        this.title = bookRecomendation.book.title
        this.author = bookRecomendation.book.author.name
        this.image = bookRecomendation.book.image
    }
}