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
}

export interface BookFileUpdate {
    id: number;
    title: string;
    author: string;
    author_id: number;
    description: string;
    genre: string[];
    anio: number;
    isbn: string;
    image: File | string;
    stock: number;
    subscriber_exclusive: boolean;
    price: number;
}