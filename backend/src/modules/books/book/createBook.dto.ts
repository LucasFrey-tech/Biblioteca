import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsInt, IsString, IsArray, IsNumber, Min, MinLength, IsOptional } from 'class-validator';

/**
 * DTO para la creación de un nuevo libro.
 * Contiene validaciones para los campos del cuerpo de la petición.
 */
export class CreateBookDTO {

  /** Título del libro */
  @IsString()
  title: string;

  /** ID del autor */
  @Type(() => Number)
  author_id: number;

  /** Descripcion del contenido del libro */
  @IsString()
  description: string;

  /** Año de publicación */
  @Type(() => Number)
  anio: number;

  /** Código ISBN */
  @IsString()
  isbn: string;

  /** Imágen del libro */
  image: string;

  /** Stock disponible */
  @Type(() => Number)
  stock: number;
  
  /** Exclusividad para suscriptores */
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  subscriber_exclusive: boolean;

   /** Precio del libro */
  @Type(() => Number)
  @Min(0)
  price: number;
  
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  /** Arreglo de IDs de géneros */
  @Transform(({ value }) => JSON.parse(value))
  @IsArray()
  @IsInt({ each: true })
  genre: number[];

  /**
   * Constructor del DTO.
   */
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
    isActive: boolean,
    genre: number[]
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
    this.isActive = isActive;
    this.genre = genre;
  }
}