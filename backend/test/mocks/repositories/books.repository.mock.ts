import { Book } from "src/entidades/book.entity";
import { mockAuthor1, mockAuthor2, mockAuthor3 } from "./authors.repository.mock";

export const mockNewBook: Book = {
    id: 4,
    title: "Asesino de Bujas",
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
            name: "Accion"
        },
        {
            id: 2,
            name: "Aventura"
        },
        {
            id: 3,
            name: "Misterio"
        },
    ]
};

export const mockUpdatedBook = {
    title: '1984',
    description: '1984 description updated.',
    anio: 1984,
    author: '',
    author_id: 1,
    genre: [
        {
            id: 1,
            name: 'Accion',
        },
        {
            id: 2,
            name: 'Aventura',
        },
    ],
    id: 1,
    image: 'http://localhost:3001/books_images/1984.png',
    isbn: "9789875669284",
    price: 272990,
    stock: 10,
    subscriber_exclusive: false,
};

export const mockBook1: Book = {
    id: 1,
    title: "1984",
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
            name: "Accion"
        },
        {
            id: 2,
            name: "Aventura"
        },
    ]
};

export const mockBook2: Book = {
    id: 2,
    title: "Rebelion En La Granja",
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
            name: "Accion"
        },
        {
            id: 3,
            name: "Misterio"
        },
    ]
};

export const mockBook3: Book = {
    id: 3,
    title: "El Codigo Da Vinci",
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
            name: "Misterio"
        }
    ]
};

export const mockBooks = [mockBook1, mockBook2, mockBook3];
export const mockDeletedBooks = [mockBook1, mockBook2];

export const mockBooksRepository = {
  find: jest.fn().mockResolvedValue(mockBooks),
  findOne: jest.fn().mockResolvedValue(mockBook1),
  create: jest.fn().mockResolvedValue(mockNewBook),
  update: jest.fn().mockResolvedValue(mockUpdatedBook),
  delete: jest.fn().mockResolvedValue(mockDeletedBooks),
  save: jest.fn().mockResolvedValue(mockNewBook),    
  remove: jest.fn().mockResolvedValue(mockBook1),    
};

