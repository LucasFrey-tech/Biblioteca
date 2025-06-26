import { Book } from 'src/entidades/book.entity';
import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsString, IsArray, IsNumber, Min, MinLength, IsOptional } from 'class-validator';
import { Author } from 'src/entidades/author.entity';
import { Genre } from 'src/entidades/genre.entity';

/**
 * Data Transfer Object (DTO) para Books.
 * Se usa para validar y transformar datos entre el cliente y el servidor.
 */
export class BookDTO {

  /**
   * ID del libro
   * @type {number}
   */
  @IsInt()
  id: number;

  /**
   * Título del libro 
   * @type {string}
   */
  @IsString()
  title: string;

  /**
   * Nombre del autor
   * */
  @IsOptional()
  @IsString()
  author?: string;

  /**
   * ID del autor
   * @type {number}
   */
  @IsOptional()
  @IsInt()
  author_id?: number;

  /**
   * Descripcion del contenido del libro 
   * @type {string}
   */
  @IsString()
  description: string;

  /**
   * Lista de géneros
   * @type {Genre}
   */
  @IsArray()
  genre: Genre[];

  /**
   * Año de publicación
   * @type {number}
   */
  @IsInt()
  anio: number;

  /**
   * Código ISBN
   * @type {string} 
   */
  @IsString()
  isbn: string;

  /**
   * Imagen del libro 
   * @type {string}
   */
  // @IsString()
  image: string;

  /**
   * Stock disponible 
   * @type {number}
   */
  @IsInt()
  stock: number;

  /**
   *  Exclusividad para suscriptores
   * @type {boolean} 
   */
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  subscriber_exclusive: boolean;

  /**
   * Precio del libro
   * @type {number} 
   */
  @IsNumber()
  @Min(0)
  price: number;

  @IsBoolean()
  is_active!: boolean;

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
    is_active: boolean,
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
    this.is_active = is_active;
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
      is_active: bookDTO.is_active,
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
      book.price,
      book.is_active,
    );
  }
}