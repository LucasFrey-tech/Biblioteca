import { ShoppingCartBook } from "src/entidades/shopping_cart_book.entity";

export const mockShoppingCartBook1:ShoppingCartBook = {
    id: 1,
    idUser:  1,
    idBook:  1,
    amount:  1,
};

export const mockShoppingCartBook2:ShoppingCartBook = {
    id: 2,
    idUser:  1,
    idBook:  2,
    amount:  2,
};

export const mockShoppingCartBook3:ShoppingCartBook = {
    id: 3,
    idUser:  2,
    idBook:  1,
    amount:  1,
};

export const mockShoppingCartBooks = [mockShoppingCartBook1, mockShoppingCartBook2, mockShoppingCartBook3];