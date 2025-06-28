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
  @IsInt()
  id: number;
  
  /**
   * Título del libro
   * @type {number}
   */
  @IsString()
  title: string;

  /**
   * Nombre del autor del libro
   * @type {number}
   */
  @IsString()
  author: string;
  
  /**
   * ID del Autor del libro
   * @type {number}
   */
  @IsOptional()
  @IsInt()
  author_id?: number;

  /**
   * Descripción del libro
   * @type {string}
   */
  @IsString()
  description: string;

  /**
   * Géneros del libro
   * @type {Genre}
   */
  @IsArray()
  genre: Genre[];

  /**
   * Anio de publicación del libro
   * @type {number}
   */
  @IsInt()
  anio: number;

  /**
   * Imagen del libro
   * @type {string}
   */
  @IsString()
  image: string;

  /**
   * Cantidad del libro disponible
   * @type {number}
   */
  @IsInt()
  stock: number;

  /**
   * Exclusividad del libro
   * @type {boolean}
   */
  @IsBoolean()
  subscriber_exclusive: boolean;
  
  /**
   * Precio del libro
   * @type {number}
   */
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