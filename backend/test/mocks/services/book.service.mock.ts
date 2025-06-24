import { mockDtoBook1, mockDtoBooks, mockDtoBooksByAuthorIdOne, mockDtoBooksWithGenreAccion, mockDtoDeletedBooks, mockDtoNewBook, mockDtoUpdateBook } from "../dtos/bookDTOs.mock";


export const mockBooksService = {
    findAll: jest.fn().mockResolvedValue(mockDtoBooks),
    findAllWithGenre: jest.fn().mockResolvedValue(mockDtoBooksWithGenreAccion),
    findAllByAuthor: jest.fn().mockResolvedValue(mockDtoBooksByAuthorIdOne),
    findOne: jest.fn().mockResolvedValue(mockDtoBook1),
    create: jest.fn().mockResolvedValue(mockDtoNewBook),
    update: jest.fn().mockResolvedValue(mockDtoUpdateBook),
    delete: jest.fn().mockResolvedValue(mockDtoDeletedBooks),
  };