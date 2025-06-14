export class ReviewI {
    constructor(
        id: number,
        id_user: number,
        id_book: number,
        username: string,
        comment: string,
        rating: number,
        reviewDate: string,
    ) { this.id = id, this.id_user = id_user, this.id_book = id_book, this.username = username, this.comment = comment, this.rating = rating, this.reviewDate = reviewDate }
    id: number;
    id_user: number;
    id_book: number;
    username: string;
    comment: string;
    rating: number;
    reviewDate: string;
};