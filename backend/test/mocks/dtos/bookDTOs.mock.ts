import { BookDTO } from "src/modules/books/book/book.dto";
import { mockAuthor1, mockAuthor2 } from "../entities/authors.mock";
import { CreateBookDTO } from "src/modules/books/book/createBook.dto";

export const mockDtoNewBook:CreateBookDTO = {
    title: "Asesino de Bujas",
    author_id: 3,
    description: "Asesino de Bujas description.",
    isbn: "9789874132574",
    image: "http://localhost:3001/books_images/ab_dioses_y_monstruos.png",
    stock: 10,
    subscriber_exclusive: false,
    price: 27299,
    anio: 1949,
    genre: [1,2,3]
};

export const mockDtoNewBookWithUnexistingGenre:CreateBookDTO = {
    title: "Asesino de Bujas",
    author_id: 3,
    description: "Asesino de Bujas description.",
    isbn: "9789874132574",
    image: "http://localhost:3001/books_images/ab_dioses_y_monstruos.png",
    stock: 10,
    subscriber_exclusive: false,
    price: 27299,
    anio: 1949,
    genre: [4]
};

export const mockDtoUpdateBookId:number = 1;
export const mockDtoUpdateBook:CreateBookDTO = {
    title: "1984",
    author_id: 1,
    description: "1984 description updated.",
    isbn: "9789875669284",
    image: "http://localhost:3001/books_images/1984.png",
    stock: 10,
    subscriber_exclusive: false,
    price: 272990,
    anio: 1984,
    genre: [1,2]
};

export const mockDtoBook1:BookDTO = {
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
    author: mockAuthor1.name,
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

export const mockDtoBook2:BookDTO = {
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
    author: mockAuthor1.name,
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

export const mockDtoBook3:BookDTO = {
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
    author: mockAuthor2.name,
    genre: [
        {
            id: 3,
            name:  "Misterio"
        }
    ]
};

export const mockDtoBooks = [mockDtoBook1, mockDtoBook2, mockDtoBook3];
export const mockDtoBooksWithGenreAccion = [mockDtoBook1, mockDtoBook2];
export const mockDtoBooksByAuthor = [mockDtoBook1, mockDtoBook2];
export const mockDtoDeletedBooks = [mockDtoBook1, mockDtoBook2];