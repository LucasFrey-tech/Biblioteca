import { PurchaseDTO, PurchaseItemDTO } from "../../../src/modules/purchase/DTO/purchase.dto";

export const mockDtoPurchaseItem1: PurchaseItemDTO = {
    id_book: 1,
    title: "1984",
    author: "George Orwell",
    image: "http://localhost:3001/books_images/1984.png",
    price: 27299,
    virtual: false,
    amount: 2,
    subscriptionDiscount: 0
};
export const mockDtoPurchaseItem2: PurchaseItemDTO = {
    id_book: 2,
    title: "Rebelion En La Granja",
    author: "George Orwell",
    image: "http://localhost:3001/books_images/rebelion_en_la_granja.png",
    price: 21900,
    virtual: false,
    amount: 1,
    subscriptionDiscount: 0
};
export const mockDtoPurchaseItem3: PurchaseItemDTO = {
    id_book: 3,
    title: "El Codigo Da Vinci",
    author: "Dan Brown",
    image: "http://localhost:3001/books_images/el_codigo_davinci.png",
    price: 36500,
    virtual: false,
    amount: 1,
    subscriptionDiscount: 0
};

export const mockDtoPurchaseItems1 = [mockDtoPurchaseItem1,mockDtoPurchaseItem2,mockDtoPurchaseItem3];
export const mockDtoPurchaseItems2 = [mockDtoPurchaseItem1,mockDtoPurchaseItem3];

export const mockDtoPurchase1: PurchaseDTO = {
    id: 1,
    id_user: 1,
    username: "curt",
    purchaseItems: mockDtoPurchaseItems1,
    purchaseDate: new Date("ayer"),
    total: 0
};

export const mockDtoPurchase2: PurchaseDTO = {
    id: 2,
    id_user: 1,
    username: "curt",
    purchaseItems: mockDtoPurchaseItems1,
    purchaseDate: new Date("hoy"),
    total: 0
};

export const mockDtoPurchases = [mockDtoPurchase1,mockDtoPurchase2]

export const mockDtoNewPurchaseItem1 = {
  cartItemId: 1,
  amount: 1,
  virtual: true,
  discount: 0,
}

export const mockDtoNewPurchasesItems = [mockDtoNewPurchaseItem1]

export const mockDtoNewPurchase = {
  idUser: 1,
  items: mockDtoNewPurchasesItems,
  price: 0,
}