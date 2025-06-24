import { ReviewI } from "src/modules/books/reviews/dto/review.dto";

export const mockReviewDto1: ReviewI = {
    id: 1,
    id_user: 1,
    id_book: 1,
    rating: 3,
    comment: "mastodonte",
    reviewDate: "1/5/2020, 09:00:00",
    username: "curt"
};

export const mockReviewDto2:ReviewI = {
    id: 2,
    id_user: 2,
    id_book: 3,
    rating: 1,
    comment: "malardo",
    reviewDate: "1/5/2020, 09:00:00",
    username: "pepe"
};

export const mockReviewDto3:ReviewI = {
    id: 3,
    id_user: 3,
    id_book: 1,
    rating: 5,
    comment: "GOOOOOOD!",
    reviewDate: "1/5/2020, 09:00:00",
    username: "jorge"
};

export const mockNewReviewDto:ReviewI = {
    id: 4,
    id_user: 1,
    id_book: 1,
    rating: 4,
    comment: "Buenardo.",
    reviewDate: "2020-05-02T00:00:00.000Z",
    username: "curt"
};

export const mockUpdatedReviewDto:ReviewI = {
    id: 1,
    id_user: 1,
    id_book: 1,
    rating: 5,
    comment: "10/10",
    reviewDate: "1/5/2020, 09:00:00",
    username: "curt"
};

export const mockReviewDtos = [mockReviewDto1, mockReviewDto2, mockReviewDto3];
export const mockReviewDtosSearchByBookId = [mockReviewDto1, mockReviewDto3];
export const mockDeletedReviews = [mockReviewDto1, mockReviewDto2];