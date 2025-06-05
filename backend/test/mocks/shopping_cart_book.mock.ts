import { ShoppingCart } from "src/entidades/shopping_cart.entity";

export const mockShoppingCart1:ShoppingCart = {
    id: 1,
    idUser:  1,
    idBook:  1,
    amount:  1,
};

export const mockShoppingCart2:ShoppingCart = {
    id: 2,
    idUser:  1,
    idBook:  2,
    amount:  2,
};

export const mockShoppingCart3:ShoppingCart = {
    id: 3,
    idUser:  2,
    idBook:  1,
    amount:  1,
};

export const mockShoppingCarts = [mockShoppingCart1, mockShoppingCart2, mockShoppingCart3];