import { Purchase } from "src/entidades/purchase.entity";
import { mockUser1, mockUser2, mockUser3 } from "./users.repository.mock";
import { mockBook1, mockBook2, mockBook3 } from "./books.repository.mock";

export const mockNewPurchase: Purchase = {
    id: 4,
    amount: 0,
    price: 0,
    virtual: false,
    purchaseDate: new Date(""),
    user: mockUser1,
    book: mockBook1
};

export const mockUpdatedPurchase = {
    idBook: 1,
    image: ""
};

export const mockPurchase1: Purchase = {
    id: 1,
    amount: 0,
    price: 0,
    virtual: false,
    purchaseDate: new Date(""),
    user: mockUser1,
    book: mockBook1
};

export const mockPurchase2: Purchase = {
    id: 2,
    amount: 0,
    price: 0,
    virtual: false,
    purchaseDate: new Date(""),
    user: mockUser2,
    book: mockBook2
};

export const mockPurchase3: Purchase = {
    id: 3,
    amount: 0,
    price: 0,
    virtual: false,
    purchaseDate: new Date(""),
    user: mockUser3,
    book: mockBook3
};

export const mockPurchases = [mockPurchase1, mockPurchase2, mockPurchase3];
export const mockDeletedPurchases = [mockPurchase1, mockPurchase2];

export const mockPurchasesRepository = {
  find: jest.fn().mockResolvedValue(mockPurchases),
  findOne: jest.fn().mockResolvedValue(mockPurchase1),
  create: jest.fn().mockResolvedValue(mockNewPurchase),
  update: jest.fn().mockResolvedValue(mockUpdatedPurchase),
  delete: jest.fn().mockResolvedValue(mockDeletedPurchases),
  save: jest.fn().mockResolvedValue(mockNewPurchase),    
  remove: jest.fn().mockResolvedValue(mockPurchase1),    
};

