import { Book } from 'src/entidades/book.entity';
import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsString, IsArray, IsNumber, Min, IsOptional } from 'class-validator';
import { Author } from 'src/entidades/author.entity';
import { Genre } from 'src/entidades/genre.entity';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object (DTO) para Books.
 * Se usa para validar y transformar datos entre el cliente y el servidor.
 */
export class BookDTO {

  /**
   * ID del libro
   * @type {number}
   */
  @ApiProperty({example: 1, description: "ID Único del Libro"})
  @IsInt()
  id: number;

  /**
   * Título del libro 
   * @type {string}
   */
  @ApiProperty({example: 'Harry Potter', description: "Titulo del Libro"})
  @IsString()
  title: string;

  /**
   * Nombre del autor
   * */
  @ApiProperty({example: "J.K Rowling", description: "Nombre del Autor"})
  @IsOptional()
  @IsString()
  author?: string;

  /**
   * ID del autor
   * @type {number}
   */
  @ApiProperty({example: 3, description: "ID Único del Autor"})
  @IsOptional()
  @IsInt()
  author_id?: number;

  /**
   * Descripcion del contenido del libro 
   * @type {string}
   */
  @ApiProperty({example: "Harry Potter y la Piedra Filosofal es el primer libro de la saga Harry Potter. Cuenta la historia de un niño huérfano que descubre que es un mago cuando cumple 11 años y es invitado a estudiar en el Colegio Hogwarts. Allí hace amigos, aprende magia y descubre que sus padres murieron luchando contra un mago malvado llamado Voldemort, quien también intentó matarlo a él. Harry comienza su aventura en el mundo mágico y se enfrenta a su destino.", description: "Sinopsis del Libro"})
  @IsString()
  description: string;

  /**
   * Lista de géneros
   * @type {Genre}
   */
  @ApiProperty({ description: "Lista de Generos", type: Genre, isArray: true, example:
    [
      {
        id: 1,
        name: "Acción"
      },
      {
        id: 2,
        name: "Aventura"
      }
    ]
  })
  @IsArray()
  genre: Genre[];

  /**
   * Año de publicación
   * @type {number}
   */
  @ApiProperty({example: 1990, description: "Año de Publicación"})
  @IsInt()
  anio: number;

  /**
   * Código ISBN
   * @type {string} 
   */
  @ApiProperty({example: 15125421212, description: "ISBN Único"})
  @IsString()
  isbn: string;

  /**
   * Imagen del libro 
   * @type {string}
   */
  // @IsString()
  @ApiProperty({example: "http://localhost:3001/books_images/LA_CORTE_DE_LAS SOMBRAS-MANSION_DE_LAS_FURIAS II.png", description: "Imagen del Libro"})
  image: string;

  /**
   * Stock disponible 
   * @type {number}
   */
  @ApiProperty({example: 5, description: "Stock del Producto"})
  @IsInt()
  stock: number;

  /**
   *  Exclusividad para suscriptores
   * @type {boolean} 
   */
  @ApiProperty({example: true, description: "Estado de Suscripción"})
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  subscriber_exclusive: boolean;

  /**
   * Precio del libro
   * @type {number} 
   */
  @ApiProperty({example: 5000, description: "Precio del Libro"})
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({example: true, description: "Estado del Libro"})
  @IsBoolean()
  is_active!: boolean;

  /**
   * Constructor del DTO.
   */
  constructor(params: {
    id: number,
    title: string,
    author?: string,
    author_id?: number,
    description: string,
    genre: Genre[],
    anio: number,
    isbn: string,
    image: string,
    stock: number,
    subscriber_exclusive: boolean,
    price: number,
    is_active: boolean,
  }) {
    this.id = params.id;
    this.title = params.title;
    this.author = params.author;
    this.author_id = params.author_id;
    this.description = params.description;
    this.genre = params.genre;
    this.anio = params.anio;
    this.isbn = params.isbn;
    this.image = params.image;
    this.stock = params.stock;
    this.subscriber_exclusive = params.subscriber_exclusive;
    this.price = params.price;
    this.is_active = params.is_active;
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
    return new BookDTO({
      id: book.id,
      title: book.title,
      author: book.author?.name || "",
      author_id: book.author?.id,
      description: book.description,
      genre: book.genres ?? [],
      anio: book.anio,
      isbn: book.isbn,
      image: book.image,
      stock: book.stock,
      subscriber_exclusive: book.subscriber_exclusive,
      price: book.price,
      is_active: book.is_active,
    });
  }
}