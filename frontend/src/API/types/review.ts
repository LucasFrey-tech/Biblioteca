export interface Review {
    id: number;
    id_user: number;
    id_book: number;
    username: string;
    comment: string;
    rating: number;
    reviewDate: string;
}