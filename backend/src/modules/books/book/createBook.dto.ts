import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsInt, IsString, IsArray, IsNumber, Min, MinLength } from 'class-validator';

export class CreateBookDTO {
  @IsString()
  title: string;

  @Type(() => Number)
  author_id: number;

  @IsString()
  description: string;

  @Type(() => Number)
  anio: number;

  @IsString()
  isbn: string;

  image: string;

  @Type(() => Number)
  stock: number;

  @Transform(({ value }) => Boolean(value))
  @IsBoolean()
  subscriber_exclusive: boolean;

  @Type(() => Number)
  @Min(0)
  price: number;


  constructor(
    title: string,
    author_id: number,
    description: string,
    anio: number,
    isbn: string,
    image: string,
    stock: number,
    subscriber_exclusive: boolean,
    price: number,
  ) {
    this.title = title;
    this.author_id = author_id;
    this.description = description;
    this.anio = anio;
    this.isbn = isbn;
    this.image = image;
    this.stock = stock;
    this.subscriber_exclusive = subscriber_exclusive;
    this.price = price;
  }
}