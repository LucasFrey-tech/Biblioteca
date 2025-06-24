import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Book } from './book.entity';

/**
 * Respresenta la entidad de una recomendación de un libro en la base de datos.
 */
@Entity('book_recommendations')
export class BookRecommendation {
    /** ID unico de la recomendación */
    @ApiProperty({ example: 1, description: 'ID Único del BookRecomendation' })
    @PrimaryGeneratedColumn()
    id: number

    /** Libros relacionados con la recomendación */
    @ManyToOne(() => Book)
    @JoinColumn({ name: "book_id", referencedColumnName: "id" })
    book: Book;
}