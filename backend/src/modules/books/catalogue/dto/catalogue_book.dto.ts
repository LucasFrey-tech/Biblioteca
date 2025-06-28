import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsInt, IsNumber, IsString, IsOptional } from "class-validator";
import { Genre } from "src/entidades/genre.entity";

/**
 * Data Transfer Object (DTO) para Catalogue.
 * Se usa para validar y transformar datos entre el cliente y el servidor.
 */
export class CatalogueBookDTO {
  /**
   * ID del libro en el catálogo
   * @type {number}
   */
  @ApiProperty({ example: 15, description: 'ID del libro en el catálogo' })
  @IsInt()
  id: number;
  
  /**
   * Título del libro
   * @type {number}
   */
  @ApiProperty({ example: 'El Hobbit', description: 'Título del libro' })
  @IsString()
  title: string;

  /**
   * Nombre del autor del libro
   * @type {number}
   */
  @ApiProperty({ example: 'J.R.R. Tolkien', description: 'Nombre del autor del libro' })
  @ApiProperty({ example: 'J.R.R. Tolkien', description: 'Nombre del autor del libro' })
  @IsString()
  author: string;
  
  /**
   * ID del Autor del libro
   * @type {number}
   */
  @ApiProperty({ example: 7, description: 'ID del autor del libro (opcional)' })
  @IsOptional()
  @IsInt()
  author_id?: number;

  /**
   * Descripción del libro
   * @type {string}
   */
  @ApiProperty({ example: 'Una aventura fantástica llena de magia y héroes.', description: 'Descripción del libro' })
  @IsString()
  description: string;

  /**
   * Géneros del libro
   * @type {Genre}
   */
  @ApiProperty({
    type: [Genre],
    description: 'Lista de géneros asociados al libro',
    example: [
      { id: 1, name: 'Fantasía' },
      { id: 3, name: 'Aventura' },
    ],
  })
  @IsArray()
  genre: Genre[];

  /**
   * Anio de publicación del libro
   * @type {number}
   */
  @ApiProperty({ example: 1937, description: 'Año de publicación del libro' })
  @IsInt()
  anio: number;

  /**
   * Imagen del libro
   * @type {string}
   */
  @ApiProperty({ example: 'hobbit.jpg', description: 'Nombre o URL de la imagen del libro' })
  @IsString()
  image: string;

  /**
   * Cantidad del libro disponible
   * @type {number}
   */
  @ApiProperty({ example: 20, description: 'Cantidad disponible en stock' })
  @IsInt()
  stock: number;

  /**
   * Exclusividad del libro
   * @type {boolean}
   */
  @ApiProperty({ example: true, description: 'Indica si el libro es exclusivo para suscriptores' })
  @IsBoolean()
  subscriber_exclusive: boolean;
  
  /**
   * Precio del libro
   * @type {number}
   */
  @ApiProperty({ example: 450.75, description: 'Precio del libro' })
  @IsNumber()
  price: number;

  /**
   * Constructor del DTO.
   */
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