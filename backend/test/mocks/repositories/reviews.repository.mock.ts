import { Review } from "src/entidades/review.entity";
import { mockUser1, mockUser2, mockUser3 } from "./users.repository.mock";
import { mockBook1, mockBook3 } from "./books.repository.mock";

export const mockReview1: Review = {
    id: 1,
    rating: 3,
    comment: "mastodonte",
    reviewDate: new Date("2020-05-02"),
    user: mockUser1,
    book: mockBook1
};

export const mockReview2:Review = {
    id: 2,
    rating: 1,
    comment: "malardo",
    reviewDate: new Date("2020-05-02"),
    user: mockUser2,
    book: mockBook3,
};

export const mockReview3:Review = {
    id: 3,
    rating: 5,
    comment: "GOOOOOOD!",
    reviewDate: new Date("2020-05-02"),
    user: mockUser3,
    book: mockBook1,
};

export const mockNewReview:Review = {
    id: 4,
    rating: 4,
    comment: "Buenardo.",
    reviewDate: new Date("2020-05-02"),
    user: mockUser1,
    book: mockBook1,
};

export const mockUpdatedReview:Review = {
    id: 1,
    rating: 5,
    comment: "10/10",
    reviewDate: new Date("2020-05-02"),
    user: mockUser1,
    book: mockBook1,
};

export const mockReviews = [mockReview1, mockReview2, mockReview3];
export const mockReviewsSearchByBookId = [mockReview1, mockReview3];
export const mockDeletedReviews = [mockReview1, mockReview2];

export const mockReviewsRepository = {
    find: jest.fn().mockResolvedValue(mockReviews),
    findOne: jest.fn().mockResolvedValue(mockReview1),
    create: jest.fn().mockResolvedValue(mockNewReview),
    update: jest.fn().mockResolvedValue(mockUpdatedReview),
    delete: jest.fn().mockResolvedValue(mockDeletedReviews),
    save: jest.fn().mockResolvedValue(mockUpdatedReview),    
    remove: jest.fn().mockResolvedValue(mockDeletedReviews),    
    findAndCount: jest.fn().mockResolvedValue([mockReviews,1]),    
  };