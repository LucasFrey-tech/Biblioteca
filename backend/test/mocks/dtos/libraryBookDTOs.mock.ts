import { LibraryBookDTO } from "src/modules/books/library/dto/library_book.dto";


export const mockDtoLibraryBook1:LibraryBookDTO = {
    id: 1,
    title: "1984",
    author_id: 1,
    description: "1984 description.",
    image: "http://localhost:3001/books_images/1984.png",
    isbn: "9789875669284"
};

export const mockDtoLibraryBook2:LibraryBookDTO = {
    id: 2,
    title: "Rebelion En La Granja",
    author_id: 1,
    description: "Rebelion En La Granja description.",
    image: "http://localhost:3001/books_images/rebelion_en_la_granja.png",
    isbn: "9786075574028"
};

export const mockDtoLibraryBook3:LibraryBookDTO = {
    id: 3,
    title: "El Codigo Da Vinci",
    author_id: 2,
    description: "El Codigo Da Vinci description.",
    image: "http://localhost:3001/books_images/el_codigo_davinci.png",
    isbn: "9788408013259"
};

export const mockDtoLibraryBooksFromUser1 = [mockDtoLibraryBook1, mockDtoLibraryBook2, mockDtoLibraryBook3];