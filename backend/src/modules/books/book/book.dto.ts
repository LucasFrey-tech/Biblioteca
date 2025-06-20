import { Book } from 'src/entidades/book.entity';
import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsString, IsArray, IsNumber, Min, MinLength, IsOptional } from 'class-validator';
import { Author } from 'src/entidades/author.entity';
import { Genre } from 'src/entidades/genre.entity';

export class BookDTO {
  @IsInt()
  id: number;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  author: string;

  @IsInt()
  author_id: number;

  @IsString()
  description: string;

  @IsArray()
  // @IsString({ each: true })
  genre: Genre[];

  @IsInt()
  anio: number;

  @IsString()
  isbn: string;

  @IsString()
  image: string;

  @IsInt()
  stock: number;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  subscriber_exclusive: boolean;

  @IsNumber()
  @Min(0)
  price: number;


  constructor(
    id: number,
    title: string,
    author: string,
    author_id: number,
    description: string,
    genre: Genre[],
    anio: number,
    isbn: string,
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
    this.anio = anio;
    this.isbn = isbn;
    this.image = image;
    this.stock = stock;
    this.subscriber_exclusive = subscriber_exclusive;
    this.price = price;
  }

  static BookDTO2BookEntity(bookDTO: BookDTO): Book {
    return {
      id: bookDTO.id,
      title: bookDTO.title,
      author_id: bookDTO.author_id,
      description: bookDTO.description,
      anio: bookDTO.anio,
      isbn: bookDTO.isbn,
      image: bookDTO.image,
      stock: bookDTO.stock,
      subscriber_exclusive: bookDTO.subscriber_exclusive,
      price: bookDTO.price,
      author: bookDTO.author ? { id: bookDTO.author_id, name: bookDTO.author } as Author : { id: 1, name: "" } as Author,
    }
  };
  

  static BookEntity2BookDTO(book: Book): BookDTO {
    return new BookDTO(
      book.id,
      book.title,
      book.author ? book.author.name : "",
      book.author_id,
      book.description,
      book.genres? book.genres:[],
      book.anio,
      book.isbn,
      book.image,
      book.stock,
      book.subscriber_exclusive,
      book.price
    );
  }
}