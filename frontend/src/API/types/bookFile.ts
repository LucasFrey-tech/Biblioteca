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