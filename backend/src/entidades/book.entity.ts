import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, JoinColumn, ManyToOne } from 'typeorm';
import { Genre } from './genre.entity';
import { Author } from './author.entity';

/**
 * Respresenta la entidad de un libro en la base de datos.
 */
@Entity('books')
export class Book {
  /** ID unico del libro */
  @ApiProperty({ example: 1, description: 'ID Único de Libros' })
  @PrimaryGeneratedColumn()
  id!: number;

  /** Título del libro */
  @ApiProperty({ example: 'El Principito', description: 'Titulo del Libro' })
  @Column()
  title!: string;

  /** Descripcion del contenido del libro */
  @ApiProperty({ example: 'Libro Infantil', description: 'Descripcion del Libro' })
  @Column('text')
  description!: string;

  /** Año de publicacion del libro */
  @ApiProperty({ example: 1940, description: 'Año de Publicacion del Libro' })
  @Column()
  anio!: number;

  /** ISBN (numero internacional) */
  @ApiProperty({ example: '978-3-16-148410-0', description: 'Numeración Internacional del Libro' })
  @Column({ unique: true })
  isbn!: string;

  /** URL o Path de la imágen de portada*/
  @ApiProperty({ example: '', description: 'Imagen de Portada del Libro' })
  @Column({ default: '' })
  image!: string;

  /** Stock disponible del libro */
  @ApiProperty({ example: 5, description: 'Disponibilidad del Libro' })
  @Column()
  stock!: number;

  /** Indica si el libro es solo para suscriptores */
  @ApiProperty({ description: 'Suscripción' })
  @Column({
    type: 'boolean',
    default: false,
    nullable: false
  })
  subscriber_exclusive!: boolean;

  /** Precio del libro */
  @ApiProperty({ example: 20000, description: 'Precio del Libro' })
  @Column('float')
  price!: number;

  /** Autor del libro */
  @ManyToOne(() => Author)
  @JoinColumn({ name: "author_id", referencedColumnName: "id" })
  author: Author;

  /** Géneros relacionados al libro */
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