import { ShoppingCartBook } from "../../../src/entidades/shopping_cart_book.entity";
import { mockUser1, mockUser2, mockUser3 } from "./users.repository.mock";
import { mockBook1, mockBook2, mockBook3 } from "./books.repository.mock";

export const mockShoppingCart1:ShoppingCartBook = {
    id: 1,
    amount: 1,
    virtual: true,
    user: mockUser1,
    book: mockBook1
};

export const mockShoppingCart2:ShoppingCartBook = {
    id: 2,
    amount:  2,
    virtual: true,
    user: mockUser2,
    book: mockBook2
};

export const mockShoppingCart3:ShoppingCartBook = {
    id: 3,
    amount:  1,
    virtual: false,
    user: mockUser2,
    book: mockBook3
};

export const mockNewShoppingCart:ShoppingCartBook = {
    id: 4,
    amount:  1,
    virtual: true,
    user: mockUser2,
    book: mockBook3
};

export const mockUpdatedhoppingCart:ShoppingCartBook = {
    id: 1,
    amount:  4,
    virtual: true,
    user: mockUser1,
    book: mockBook1
};

export const mockShoppingCarts = [mockShoppingCart1, mockShoppingCart2, mockShoppingCart3];
export const mockShoppingCartsByUser1 = [mockShoppingCart1];
export const mockDeletedShoppingCarts = [mockShoppingCart1, mockShoppingCart2];

export const mockShoppingCartBookRepository = {
    find: jest.fn().mockResolvedValue(mockShoppingCarts),
    findOne: jest.fn().mockResolvedValue(mockShoppingCart1),
    create: jest.fn().mockResolvedValue(mockNewShoppingCart),
    delete: jest.fn().mockResolvedValue(mockDeletedShoppingCarts),
    save: jest.fn().mockResolvedValue(mockNewShoppingCart),    
    remove: jest.fn().mockResolvedValue({affected: 1}),
    update: jest.fn().mockResolvedValue(mockUpdatedhoppingCart),
  };