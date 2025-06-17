import { IsBoolean, IsInt, IsNumber, IsString } from "class-validator";

export class CatalogueBookDTO {
  @IsInt()
  id: number;

  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsInt()
  author_id: number;

  @IsString()
  description: string;

  @IsString({ each: true })
  genre: string[];

  @IsInt()
  anio: number;

  @IsString()
  image: string;

  @IsInt()
  stock: number;

  @IsBoolean()
  subscriber_exclusive: boolean;
  
  @IsNumber()
  price: number;

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
}