import { mockUser1, mockUser2, mockUser3 } from "../repositories/users.repository.mock";
import { mockBook1, mockBook2, mockBook3 } from "../repositories/books.repository.mock";
import { BookCartDTO } from "../../../src/modules/shopping_cart/book_cart.dto";
import { ShoppingCartBook } from "../../../src/entidades/shopping_cart_book.entity";

export const mockDtoShoppingCart1:BookCartDTO = {
    amount: 1,
    author: "George Orwell",
    id: 1,
    idBook: 1,
    image: "http://localhost:3001/books_images/1984.png",
    price: 27299,
    title: "1984",
    virtual: true,
};

export const mockDtoShoppingCart2:BookCartDTO = {
    amount: 2,
    author: "George Orwell",
    id: 2,
    idBook: 2,
    image: "http://localhost:3001/books_images/rebelion_en_la_granja.png",
    price: 21900,
    title: "Rebelion En La Granja",
    virtual: true,
};

export const mockDtoShoppingCart3:BookCartDTO = {
    amount: 1,
    author: "Dan Brown",
    id: 3,
    idBook: 3,
    image: "http://localhost:3001/books_images/el_codigo_davinci.png",
    price: 36500,
    title: "El Codigo Da Vinci",
    virtual: false,
};

export const mockDtoNewShoppingCart:ShoppingCartBook = {
    id: 4,
    amount:  1,
    virtual: true,
    user: mockUser2,
    book: mockBook3
};

export const mockDtoUpdatedhoppingCart:ShoppingCartBook = {
    id: 1,
    amount:  4,
    virtual: true,
    user: mockUser1,
    book: mockBook3
};

export const mockDtoShoppingCarts = [mockDtoShoppingCart1, mockDtoShoppingCart2, mockDtoShoppingCart3];
export const mockDtoShoppingCartsByUser1 = [mockDtoShoppingCart1];
export const mockDtoDeletedShoppingCarts = [mockDtoShoppingCart1, mockDtoShoppingCart2];