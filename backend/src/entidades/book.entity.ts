import { APP_FILTER } from '@nestjs/core';
import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('books')
export class Book {
  @ApiProperty({example: 1, description: 'ID Único de Libros'})
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({example: 'El Principito', description: 'Titulo del Libro'})
  @Column()
  title!: string;

  @ApiProperty({example: 1, description: 'ID Único de Autor'})
  @Column()
  author_id!: number;

  @ApiProperty({example: 'Libro Infantil', description: 'Descripcion del Libro'})
  @Column('text')
  description!: string;

  @ApiProperty({example: 1940, description: 'Año de Publicacion del Libro'})
  @Column()
  anio!: number;

  @ApiProperty({example: '978-3-16-148410-0', description: 'Numeración Internacional del Libro'})
  @Column({ unique: true })
  isbn!: string;

  @ApiProperty({example: '', description: 'Imagen de Portada del Libro'})
  @Column({ default: '' })
  image!: string;

  @ApiProperty({example: 5, description: 'Disponibilidad del Libro'})
  @Column()
  stock!: number;

  @ApiProperty({ description: 'Suscripción' })
  @Column({ 
    type: 'boolean', 
    default: false,
    nullable: false 
  })
  subscriber_exclusive!: boolean;

  @ApiProperty({example: 20000, description: 'Precio del Libro'})
  @Column('float')
  price!: number;
}