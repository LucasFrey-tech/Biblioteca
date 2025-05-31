export class CatalogueBookDTO {
  constructor(
    id: number,
    title: string,
    author_id: number,
    description: string,
    isbn: string,
    image: string,
    stock: number,
    subscriber_exclusive: boolean,
    price: number
  ) {
    this.id = id;
    this.title = title;
    this.author_id = author_id;
    this.description = description;
    this.isbn = isbn;
    this.image = image;
    this.stock = stock;
    this.subscriber_exclusive = subscriber_exclusive;
    this.price = price;
  }
  
  id: number;
  title: string;
  author_id: number;
  description: string;
  isbn: string;
  image: string;
  stock: number;
  subscriber_exclusive: boolean;
  price: number;
}