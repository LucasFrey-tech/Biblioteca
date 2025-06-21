import { Review } from "src/entidades/review.entity";
import { mockUser1, mockUser2, mockUser3 } from "./user.mock";

export const mockReview1: Review = {
    id: 1,
    id_user: 1,
    id_book: 1,
    rating: 3,
    comment: "mastodonte",
    reviewDate: new Date("2020-05-02"),
    user: mockUser1
};

export const mockReview2:Review = {
    id: 2,
    id_user: 2,
    id_book: 3,
    rating: 1,
    comment: "malardo",
    reviewDate: new Date("2020-05-02"),
    user: mockUser2
};

export const mockReview3:Review = {
    id: 3,
    id_user: 3,
    id_book: 2,
    rating: 5,
    comment: "GOOOOOOD!",
    reviewDate: new Date("2020-05-02"),
    user: mockUser3
};

export const mockReviews = [mockReview1, mockReview2, mockReview3];