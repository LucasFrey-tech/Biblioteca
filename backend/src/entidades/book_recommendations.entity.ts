import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Book } from './book.entity';

/**
 * Entidad que representa una recomendación de un libro en el sistema.
 * 
 * Esta clase mapea la tabla 'book_recommendations' en la base de datos y establece la reclacion
 * con la entidad Book
 */
@Entity('book_recommendations')
export class BookRecommendation {
    /**
     * ID unico de la recomendación
     * @type {number}
     */
    @ApiProperty({ example: 1, description: 'ID Único del BookRecomendation' })
    @PrimaryGeneratedColumn()
    id: number

    /** 
     * Libros relacionados con la recomendación
     * @type {Book}
    */
    @ApiProperty({type: () => Book, description: "Libro Asociado"})
    @ManyToOne(() => Book)
    @JoinColumn({ name: "book_id", referencedColumnName: "id" })
    book: Book;
}