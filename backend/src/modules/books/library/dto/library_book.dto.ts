import { IsArray, IsOptional, IsInt, IsString } from "class-validator";
import { Genre } from "src/entidades/genre.entity";

export class LibraryBookDTO {
  @IsInt()
  id: number;

  @IsString()
  title: string;

  @IsOptional()
  @IsInt()
  author_id?: number;

  @IsString()
  description: string;

  @IsArray()
  genre: Genre[];

  @IsString()
  isbn: string;

  @IsString()
  image: string;

  constructor(
    id: number,
    title: string,
    author_id: number | undefined,
    description: string,
    genre: Genre[],
    isbn: string,
    image: string,
  ) {
    this.id = id;
    this.title = title;
    this.author_id = author_id;
    this.description = description;
    this.genre = genre;
    this.isbn = isbn;
    this.image = image;
  }
}