import { Genre } from "./genre";

export interface BookFile {
    title: string;
    author_id: number;
    description: string;
    anio: number;
    isbn: string;
    image: File | string;
    stock: number;
    subscriber_exclusive: boolean;
    price: number;
    content: File | string;
}

export interface BookFileUpdate {
    id: number;
    title: string;
    author: string;
    author_id: number;
    description: string;
    genre: Genre[];
    anio: number;
    isbn: string;
    image: File | string;
    stock: number;
    subscriber_exclusive: boolean;
    price: number;
    content: File | string;
}