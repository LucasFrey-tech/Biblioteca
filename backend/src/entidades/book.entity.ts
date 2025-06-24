import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, JoinColumn, ManyToOne } from 'typeorm';
import { Genre } from './genre.entity';
import { Author } from './author.entity';

/**
 * Entidad que representa un libro en el sistema.
 * 
 * Esta clase mapea la tabla 'books' en la base de datos y establece las relaciones
 * con las entidades de Author y Genre
 */
@Entity('books')
export class Book {
  /**
   * ID unico del libro
   * @type {number}
   */
  @ApiProperty({ example: 1, description: 'ID Único de Libros' })
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * Título del libro
   *  @type {string} 
   */
  @ApiProperty({ example: 'El Principito', description: 'Titulo del Libro' })
  @Column()
  title!: string;

  /**
   * Descripcion del contenido del libro
   * @type {string} 
   */
  @ApiProperty({ example: 'Libro Infantil', description: 'Descripcion del Libro' })
  @Column('text')
  description!: string;

  /**
   * Año de publicacion del libro
   * @type {number} 
   */
  @ApiProperty({ example: 1940, description: 'Año de Publicacion del Libro' })
  @Column()
  anio!: number;

  /** ISBN (numero internacional) 
   * @type {string}  
   */
  @ApiProperty({ example: '978-3-16-148410-0', description: 'Numeración Internacional del Libro' })
  @Column({ unique: true })
  isbn!: string;

  /**
   * URL o Path de la imágen de portada
   * @type {string} 
   */
  @ApiProperty({ example: '', description: 'Imagen de Portada del Libro' })
  @Column({ default: '' })
  image!: string;

  /**
   * Stock disponible del libro
   * @type {number} 
   */
  @ApiProperty({ example: 5, description: 'Disponibilidad del Libro' })
  @Column()
  stock!: number;

  /** 
   * Indica si el libro es solo para suscriptores
   * @type {boolean} 
   */
  @ApiProperty({ description: 'Suscripción' })
  @Column({
    type: 'boolean',
    default: false,
    nullable: false
  })
  subscriber_exclusive!: boolean;

  /**
   *  Precio del libro
   * @type {number} 
   */
  @ApiProperty({ example: 20000, description: 'Precio del Libro' })
  @Column('float')
  price!: number;

  /** 
   * Autor del libro
   * @type {Author} 
  */
  @ManyToOne(() => Author)
  @JoinColumn({ name: "author_id", referencedColumnName: "id" })
  author: Author;

  /** 
   * Géneros relacionados al libro
   * @type {Genre} 
   */
  @ManyToMany(type => Genre)
  @JoinTable({
    name: "book_genres", // tabla intermedia
    joinColumn: {
      name: "id_book",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "id_genre",
      referencedColumnName: "id"
    }
  })
  genres?: Genre[];

}