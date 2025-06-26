import { VirtualBookContent } from "src/entidades/virtual_book_content.entity";
import { mockBook1, mockBook2, mockBook3 } from "./books.repository.mock";

export const mockVirtualBookContent1:VirtualBookContent = {
    id: 1,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    book: mockBook1
};

export const mockVirtualBookContent2:VirtualBookContent = {
    id: 2,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    book: mockBook2
};

export const mockVirtualBookContent3:VirtualBookContent = {
    id: 3,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    book: mockBook3
};

export const mockUpdatedVirtualContent:VirtualBookContent = {
    id: 1,
    content: "url",
    book: mockBook1
};

export const mockVirtualBookContents = [mockVirtualBookContent1, mockVirtualBookContent2, mockVirtualBookContent3];