import { Book } from "src/entidades/book.entity";
import { mockAuthor1, mockAuthor2, mockAuthor3 } from "./authors.mock";

export const mockNewBook:Book = {
    id: 4,
    title: "Asesino de Bujas",
    author_id: 3,
    description: "Asesino de Bujas description.",
    isbn: "9789874132574",
    image: "http://localhost:3001/books_images/ab_dioses_y_monstruos.png",
    stock: 10,
    subscriber_exclusive: false,
    price: 27299,
    anio: 1949,
    author: mockAuthor3,
    genres: [
        {
            id: 1,
            name:  "Accion"
        },
        {
            id: 2,
            name:  "Aventura"
        },
        {
            id: 3,
            name:  "Misterio"
        },
    ]
};

export const mockUpdateBook:Book = {
    id: 1,
    title: "1984",
    author_id: 1,
    description: "1984 description updated.",
    isbn: "9789875669284",
    image: "http://localhost:3001/books_images/1984.png",
    stock: 10,
    subscriber_exclusive: false,
    price: 272990,
    anio: 1984,
    author: mockAuthor1,
    genres: [
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

export const mockBook1:Book = {
    id: 1,
    title: "1984",
    author_id: 1,
    description: "1984 description.",
    isbn: "9789875669284",
    image: "http://localhost:3001/books_images/1984.png",
    stock: 10,
    subscriber_exclusive: false,
    price: 27299,
    anio: 1949,
    author: mockAuthor1,
    genres: [
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

export const mockBook2:Book = {
    id: 2,
    title: "Rebelion En La Granja",
    author_id: 1,
    description: "Rebelion En La Granja description.",
    isbn: "9786075574028",
    image: "http://localhost:3001/books_images/rebelion_en_la_granja.png",
    stock: 19,
    subscriber_exclusive: false,
    price: 21900,
    anio: 1945,
    author: mockAuthor1,
    genres: [
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

export const mockBook3:Book = {
    id: 3,
    title: "El Codigo Da Vinci",
    author_id: 2,
    description: "El Codigo Da Vinci description.",
    isbn: "9788408013259",
    image: "http://localhost:3001/books_images/el_codigo_davinci.png",
    stock: 33,
    subscriber_exclusive: false,
    price: 36500,
    anio: 2012,
    author: mockAuthor2,
    genres: [
        {
            id: 3,
            name:  "Misterio"
        }
    ]
};

export const mockBooks = [mockBook1, mockBook2, mockBook3];
export const mockDeletedBooks = [mockBook1, mockBook2];