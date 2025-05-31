import { Book } from "src/entidades/book.entity";

export let mockBook1:Book = {
    id: 1,
    title:  "si",
    author_id: 1,
    description: "si",
    isbn: "1",
    image: "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg",
    stock: 10,
    subscriber_exclusive: false,
    price: 12.4,
};

export let mockBook2:Book = {
    id: 2,
    title:  "no",
    author_id: 1,
    description: "no",
    isbn: "1",
    image: "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg",
    stock: 10,
    subscriber_exclusive: false,
    price: 12.4,
};

export let mockBook3:Book = {
    id: 3,
    title:  "ni",
    author_id: 1,
    description: "ni",
    isbn: "1",
    image: "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg",
    stock: 10,
    subscriber_exclusive: false,
    price: 12.4,
};

export let mockBooks = [mockBook1, mockBook2, mockBook3];