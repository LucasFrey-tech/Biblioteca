import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Entidad que representa un carousel en el sistema.
 * 
 * Esta clase mapea la tabla 'carousel' en la base de datos.
 */
@Entity('carousel')
export class Carousel {
    /**
     * ID unico del carousel
     * @type {number}
     */
    @ApiProperty({ example: 1, description: 'ID Único del item del Carrusel' })
    @PrimaryGeneratedColumn()
    id: number

    /**
     * ID del libro para el carousel
     * @type {number}
     */
    @ApiProperty({ example: 1, description: 'ID Único item del Carrusel' })
    @Column({ name: 'book_id', type: 'integer' })
    idBook: number;

    /**
     * Imágen del carousel
     * @type {string}
     */
    @ApiProperty({example: '', description: 'Imagen del item del Carrusel'})
    @Column({ default: '' })
    image!: string;
}