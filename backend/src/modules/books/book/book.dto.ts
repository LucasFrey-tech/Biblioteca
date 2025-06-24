import { Book } from 'src/entidades/book.entity';
import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsString, IsArray, IsNumber, Min, MinLength, IsOptional } from 'class-validator';
import { Author } from 'src/entidades/author.entity';
import { Genre } from 'src/entidades/genre.entity';

/**
 * Data Transfer Object (DTO) para Books.
 * Se usa para validar y transformar datos entre el cliente y el servidor, incluyendo validaciones.
 */
export class BookDTO {

  /** ID del libro */
  @IsInt()
  id: number;

  /** Título del libro */
  @IsString()
  title: string;

  /** Nombre del autor */
  @IsOptional()
  @IsString()
  author?: string;

  /** ID del autor */
  @IsOptional()
  @IsInt()
  author_id?: number;

  /** Descripcion del contenido del libro */
  @IsString()
  description: string;
  /** Lista de géneros */
  @IsArray()
  genre: Genre[];

  /** Año de publicación */
  @IsInt()
  anio: number;

  /** Código ISBN */
  @IsString()
  isbn: string;

  /** Imagen del libro */
  @IsString()
  image: string;

  /** Stock disponible */
  @IsInt()
  stock: number;

  /** Exclusividad para suscriptores */
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  subscriber_exclusive: boolean;

  /** Precio del libro */
  @IsNumber()
  @Min(0)
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

  /**
   * Convierte un BookDTO a Book (Entidad).
   * @param bookDTO DTO del libro
   * @returns Entidad Book
   */
  static BookDTO2BookEntity(bookDTO: BookDTO): Book {
    return {
      id: bookDTO.id,
      title: bookDTO.title,
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
  
  /**
   * Convierte una entidad Book a un DTO.
   * @param book Entidad Book
   * @returns DTO del libro
   */
  static BookEntity2BookDTO(book: Book): BookDTO {
    return new BookDTO(
      book.id,
      book.title,
      book.author?.name || "",
      book.author?.id,
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