import { IsOptional } from "class-validator";
import { IsInt, IsString } from "class-validator";

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
  
  @IsString()
  isbn: string;
  
  @IsString()
  image: string;

  constructor(
    id: number,
    title: string,
    author_id: number | undefined,
    description: string,
    isbn: string,
    image: string,
  ) {
    this.id = id;
    this.title = title;
    this.author_id = author_id;
    this.description = description;
    this.isbn = isbn;
    this.image = image;
  }
}