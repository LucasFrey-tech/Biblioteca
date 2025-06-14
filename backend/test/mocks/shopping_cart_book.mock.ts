import { ShoppingCartBook } from "src/entidades/shopping_cart_book.entity";

export const mockShoppingCart1:ShoppingCartBook = {
    id: 1,
    idUser:  1,
    idBook:  1,
    amount:  1,
    virtual: true,
};

export const mockShoppingCart2:ShoppingCartBook = {
    id: 2,
    idUser:  1,
    idBook:  2,
    amount:  2,
    virtual: true,
};

export const mockShoppingCart3:ShoppingCartBook = {
    id: 3,
    idUser:  2,
    idBook:  1,
    amount:  1,
    virtual: false,
};

export const mockShoppingCarts = [mockShoppingCart1, mockShoppingCart2, mockShoppingCart3];