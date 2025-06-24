import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('carousel')
export class Carousel {
    @ApiProperty({ example: 1, description: 'ID Único del item del Carrusel' })
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({ example: 1, description: 'ID Único item del Carrusel' })
    @Column({ name: 'book_id', type: 'integer' })
    idBook: number;

    @ApiProperty({example: '', description: 'Imagen del item del Carrusel'})
    @Column({ default: '' })
    image!: string;
}