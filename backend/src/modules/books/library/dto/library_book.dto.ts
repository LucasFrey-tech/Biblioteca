import { IsArray, IsOptional, IsInt, IsString } from "class-validator";
import { Genre } from "../../../../entidades/genre.entity";
import { ApiProperty } from "@nestjs/swagger";

export class LibraryBookDTO {
  @ApiProperty({ example: 42, description: 'ID único del libro' })
  @IsInt()
  id: number;

  @ApiProperty({ example: 'El Hobbit', description: 'Título del libro' })
  @IsString()
  title: string;

  @ApiProperty({ example: 7, description: 'ID del autor (opcional)' })
  @IsOptional()
  @IsInt()
  author_id?: number;

  @ApiProperty({
    example: 'Una aventura épica de fantasía en la Tierra Media.',
    description: 'Descripción del contenido del libro',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Géneros asociados al libro',
    type: [Genre],
    example: [
      { id: 1, name: 'Fantasía' },
      { id: 3, name: 'Aventura' },
    ],
  })
  @IsArray()
  genre: Genre[];

  @ApiProperty({ example: '978-84-450-7255-5', description: 'Código ISBN del libro' })
  @IsString()
  isbn: string;

  @ApiProperty({ example: 'hobbit.jpg', description: 'Nombre o URL de la imagen del libro' })
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