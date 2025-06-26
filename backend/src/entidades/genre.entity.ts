import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * Entidad que representa un genro en el sistema.
 * 
 * Esta clase mapea la tabla 'Genre' en la base de datos.
 */
@Entity('genres')
export class Genre {

  /**
   * ID único del genero
   * @type {number}
   */
  @ApiProperty({example: 1, description: 'ID Único del Genero'})
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Nombre del genero
   * @type {string}
   */
  @ApiProperty({example: 'Aventura', description: 'Nombre del Genero'})
  @Column()
  name: string;
}