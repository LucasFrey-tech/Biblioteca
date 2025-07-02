import { BookRecommendation } from "../../../src/entidades/book_recommendations.entity";
import { mockBook1, mockBook2, mockBook3 } from "./books.repository.mock";

export const mockNewBookRecomendation: BookRecommendation = {
    id: 4,
    book: mockBook1
};

export const mockUpdatedBookRecomendation = {
    book: mockBook1
};

export const mockBookRecomendation1: BookRecommendation = {
    id: 1,
    book: mockBook1
};

export const mockBookRecomendation2: BookRecommendation = {
    id: 2,
    book: mockBook2
};

export const mockBookRecomendation3: BookRecommendation = {
    id: 3,
    book: mockBook3
};

export const mockBooksRecomendation = [mockBookRecomendation1, mockBookRecomendation2, mockBookRecomendation3];
export const mockDeletedBooksRecomendation = [mockBookRecomendation1, mockBookRecomendation2];

export const mockBooksRecomendationRepository = {
  find: jest.fn().mockResolvedValue(mockBooksRecomendation),
  findOne: jest.fn().mockResolvedValue(mockBookRecomendation1),
  create: jest.fn().mockResolvedValue(mockNewBookRecomendation),
  update: jest.fn().mockResolvedValue(mockUpdatedBookRecomendation),
  delete: jest.fn().mockResolvedValue(mockDeletedBooksRecomendation),
  save: jest.fn().mockResolvedValue(mockNewBookRecomendation),    
  remove: jest.fn().mockResolvedValue({}),    
};

