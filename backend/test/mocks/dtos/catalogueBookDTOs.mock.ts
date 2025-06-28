import { CatalogueBookDTO } from "src/modules/books/catalogue/dto/catalogue_book.dto";


export const mockDtoCatalogueBook1:CatalogueBookDTO = {
    id: 1,
    title: "1984",
    author_id: 1,
    description: "1984 description.",
    image: "http://localhost:3001/books_images/1984.png",
    stock: 10,
    subscriber_exclusive: false,
    price: 27299,
    anio: 1949,
    author: "George Orwell",
    genre: [
        {
            id: 1,
            name:  "Accion"
        },
        {
            id: 2,
            name:  "Aventura"
        },
    ]
};

export const mockDtoCatalogueBook2:CatalogueBookDTO = {
    id: 2,
    title: "Rebelion En La Granja",
    author_id: 1,
    description: "Rebelion En La Granja description.",
    image: "http://localhost:3001/books_images/rebelion_en_la_granja.png",
    stock: 19,
    subscriber_exclusive: false,
    price: 21900,
    anio: 1945,
    author: "George Orwell",
    genre: [
        {
            id: 1,
            name:  "Accion"
        },
        {
            id: 3,
            name:  "Misterio"
        },
    ]
};

export const mockDtoCatalogueBook3:CatalogueBookDTO = {
    id: 3,
    title: "El Codigo Da Vinci",
    author_id: 2,
    description: "El Codigo Da Vinci description.",
    image: "http://localhost:3001/books_images/el_codigo_davinci.png",
    stock: 33,
    subscriber_exclusive: false,
    price: 36500,
    anio: 2012,
    author: "Dan Brown",
    genre: [
        {
            id: 3,
            name:  "Misterio"
        }
    ]
};

export const mockDtoCatalogueBooks = [mockDtoCatalogueBook1, mockDtoCatalogueBook2, mockDtoCatalogueBook3];