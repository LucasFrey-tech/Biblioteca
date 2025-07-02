import { UserVirtualBooks } from "src/entidades/user_virtual_books.entity";
import { mockBook1, mockBook2, mockBook3 } from "./books.repository.mock";
import { mockUser1, mockUser2, mockUser3 } from "./users.repository.mock";

export const mockUserVirtualBooks1:UserVirtualBooks = {
    id: 1,
    book: mockBook1,
    user: mockUser1
};

export const mockUserVirtualBooks2:UserVirtualBooks = {
    id: 2,
    book: mockBook2,
    user: mockUser1
};

export const mockUserVirtualBooks3:UserVirtualBooks = {
    id: 3,
    book: mockBook3,
    user: mockUser2
};

export const mockNewUserVirtualBooks:UserVirtualBooks = {
    id: 4,
    book: mockBook3,
    user: mockUser3
};

export const mockUserVirtualBooks = [mockUserVirtualBooks1, mockUserVirtualBooks2, mockUserVirtualBooks3];
export const mockDeletedUserVirtualBooks = [mockUserVirtualBooks1, mockUserVirtualBooks2];

export const mockUserVirtualBookRepository = {
    find: jest.fn().mockResolvedValue(mockUserVirtualBooks),
    findOne: jest.fn().mockResolvedValue(mockUserVirtualBooks1),
    create: jest.fn().mockResolvedValue(mockNewUserVirtualBooks),
    delete: jest.fn().mockResolvedValue(mockDeletedUserVirtualBooks),
    save: jest.fn().mockResolvedValue(mockNewUserVirtualBooks),    
    remove: jest.fn().mockResolvedValue(mockDeletedUserVirtualBooks),    
    update: jest.fn().mockResolvedValue(mockNewUserVirtualBooks),    
    findAndCount: jest.fn().mockResolvedValue(mockNewUserVirtualBooks),    
    
  };