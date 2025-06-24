import { IsArray, IsBoolean, IsInt, IsNumber, IsString, IsOptional } from "class-validator";
import { Genre } from "src/entidades/genre.entity";

export class CatalogueBookDTO {
  @IsInt()
  id: number;

  @IsString()
  title: string;

  @IsString()
  author: string;
  
  @IsOptional()
  @IsInt()
  author_id?: number;

  @IsString()
  description: string;

  @IsArray()
  genre: Genre[];

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
    author_id: number | undefined,
    description: string,
    genre: Genre[],
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