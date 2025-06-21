import { UserVirtualBooks } from "src/entidades/user_virtual_books.entity";
import { mockBook1, mockBook2, mockBook3 } from "./books.mock";

export const mockUserVirtualBooks1:UserVirtualBooks = {
    id: 1,
    idBook: 1,
    idUser: 1,
    book: mockBook1
};

export const mockUserVirtualBooks2:UserVirtualBooks = {
    id: 2,
    idBook: 2,
    idUser: 2,
    book: mockBook2
};

export const mockUserVirtualBooks3:UserVirtualBooks = {
    id: 3,
    idBook: 3,
    idUser: 3,
    book: mockBook3
};

export const mockUserVirtualBooks = [mockUserVirtualBooks1, mockUserVirtualBooks2, mockUserVirtualBooks3];