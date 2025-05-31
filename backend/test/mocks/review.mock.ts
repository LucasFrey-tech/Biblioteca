import { Review } from "src/entidades/review.entity";

export const mockReview1: Review = {
    id: 1,
    idUser: 1,
    idBook: 1,
    rating: 3,
    comment: "mastodonte",
    reviewDate: new Date("2020-05-02"),
};

export const mockReview2:Review = {
    id: 2,
    idUser: 2,
    idBook: 3,
    rating: 1,
    comment: "malardo",
    reviewDate: new Date("2020-05-02"),
};

export const mockReview3:Review = {
    id: 3,
    idUser: 3,
    idBook: 2,
    rating: 5,
    comment: "GOOOOOOD!",
    reviewDate: new Date("2020-05-02"),
};

export const mockReviews = [mockReview1, mockReview2, mockReview3];