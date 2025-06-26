import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Entidad que representa un autor de un libro en el sistema.
 * 
 * Esta clase mapea la tabla 'authors' en la base de datos.
 */
@Entity('authors')
export class Author {

  /**
   * ID unico del autor
   * @type {number} 
   */
  @ApiProperty({ example: 1, description: 'ID Único del Autor'})
  @PrimaryGeneratedColumn()
  id: number

  /**
   * nombre del autor
   * @type {string}
   */
  @ApiProperty({ example: 'Roberto Kafka'})
  @Column({ length: 100 })
  name: string;
}