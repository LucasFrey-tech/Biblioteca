
import { Author } from "src/entidades/author.entity";


export const mockAuthor1:Author = {
    id: 1,
    name:  "George Orwell"
};

export const mockAuthor2:Author = {
    id: 2,
    name:  "Dan Brown"
};

export const mockAuthor3:Author = {
    id: 3,
    name:  "Juan Polaco"
};

export const mockNewAuthor:Author = {
    id: 4,
    name:  "George Orwell"
};

export const mockUpdatedAuthor:Author = {
    id: 1,
    name:  "George Orweliño"
};

export const mockAuthors = [mockAuthor1, mockAuthor2, mockAuthor3];
export const mockDeleteAuthors = [mockAuthor1, mockAuthor2];

export const mockAuthorsRepository = {
    find: jest.fn().mockResolvedValue(mockAuthors),
    findOne: jest.fn().mockResolvedValue(mockAuthor1),
    create: jest.fn().mockResolvedValue(mockNewAuthor),
    update: jest.fn().mockResolvedValue(mockUpdatedAuthor),
    delete: jest.fn().mockResolvedValue(mockDeleteAuthors),
    save: jest.fn().mockResolvedValue(mockNewAuthor),    
    remove: jest.fn().mockResolvedValue(mockAuthor1),  
    findAndCount: jest.fn().mockResolvedValue([mockAuthors,1]),  
  }