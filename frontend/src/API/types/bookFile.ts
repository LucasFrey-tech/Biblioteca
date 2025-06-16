export interface BookFile {
    id: number;
    title: string;
    author: string;
    author_id: number;
    description: string;
    genre: string[];
    anio: number;
    isbn: string;
    image: File;
    stock: number;
    subscriber_exclusive: boolean;
    price: number;
    virtual:boolean;
}

export interface BookFileUpdate{
    id: number;
    title: string;
    author: string;
    author_id: number;
    description: string;
    genre: string[];
    anio: number;
    isbn: string;
    image: File | string; // Puede ser un File o una URL
    stock: number;
    subscriber_exclusive: boolean;
    price: number;

}