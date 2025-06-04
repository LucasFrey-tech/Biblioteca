export interface Book {
    id: number;
    title: string;
    author: string;
    author_id: number;
    description: string;
    genre: string[];
    anio: number;
    isbn: string;
    image: string;
    stock: number;
    subscriber_exclusive: boolean;
    price: number;
}