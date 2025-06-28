import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsInt, IsString, IsArray, IsNumber, Min, MinLength, IsOptional } from 'class-validator';

/**
 * DTO para la creación de un nuevo libro.
 * Contiene validaciones para los campos del cuerpo de la petición.
 */
export class CreateBookDTO {

  /** Título del libro */
  @ApiProperty({ example: 'El Señor de los Anillos', description: 'Título del libro' })
  @IsString()
  title: string;

  /** ID del autor */
  @ApiProperty({ example: 1, description: 'ID del autor' })
  @Type(() => Number)
  author_id: number;

  /** Descripcion del contenido del libro */
  @ApiProperty({ example: 'Una historia épica de fantasía', description: 'Descripción del contenido del libro' })
  @IsString()
  description: string;

  /** Año de publicación */
  @ApiProperty({ example: 1954, description: 'Año de publicación' })
  @Type(() => Number)
  anio: number;

  /** Código ISBN */
  @ApiProperty({ example: '978-84-450-7144-5', description: 'Código ISBN del libro' })
  @IsString()
  isbn: string;

  /** Imágen del libro */
  @ApiProperty({ example: 'portada.jpg', description: 'Nombre del archivo de la imagen del libro' })
  image: string;

  /** Stock disponible */
  @ApiProperty({ example: 15, description: 'Stock disponible del libro' })
  @Type(() => Number)
  stock: number;
  
  /** Exclusividad para suscriptores */
  @ApiProperty({ example: true, description: 'Indica si el libro es exclusivo para suscriptores' })
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  subscriber_exclusive: boolean;

   /** Precio del libro */
  @ApiProperty({ example: 2999.99, description: 'Precio del libro en pesos' })
  @Type(() => Number)
  @Min(0)
  price: number;
  
  @ApiProperty({ example: true, description: 'Indica si el libro está activo o no' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  /** Arreglo de IDs de géneros */
  @ApiProperty({
    example: [1, 2, 3],
    description: 'Arreglo de IDs que representan los géneros del libro',
    type: [Number],
  })
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