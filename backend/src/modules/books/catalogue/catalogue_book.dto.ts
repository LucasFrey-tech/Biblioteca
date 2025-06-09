export class CatalogueBookDTO {
  constructor(
    id: number,
    title: string,
    author: string,
    author_id: number,
    description: string,
    genre: string[],
    anio: number,
    image: string,
    stock: number,
    subscriber_exclusive: boolean,
    price: number,
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.author_id = author_id;
    this.description = description;
    this.genre = genre;
    this.image = image;
    this.stock = stock;
    this.subscriber_exclusive = subscriber_exclusive;
    this.price = price;
    this.anio = anio;
  }
  
  id: number;
  title: string;
  author: string;
  author_id: number;
  description: string;
  genre: string[];
  anio: number;
  image: string;
  stock: number;
  subscriber_exclusive: boolean;
  price: number;
}