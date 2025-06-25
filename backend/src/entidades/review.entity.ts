import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Book } from './book.entity';

/**
 * Entidad que representa una reseña o comentario en el sistema.
 * 
 * Esta clase mapea la tabla 'reviews' en la base de datos y establece las relaciones
 * con las entidades de User y Book
 */
@Entity('reviews')
export class Review {
    /**
     * ID único de la reseña
     * @type {number}
     */
    @ApiProperty({ example: 1, description: 'ID Único de la Crítica' })
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * Calificación de la reseña
     * @type {number}
     */
    @ApiProperty({ example: 5, description: 'Puntaje del 1 al 5' })
    @Column({ type: 'smallint' })
    rating: number;

    /**
     * Contenido de la reseña
     * @type {string}
     */
    @ApiProperty({ example: 'Muy Bueno', description: 'Comentario sobre el Libro' })
    @Column({ length: 350 })
    comment: string;

    /**
     * Fecha de creación de la reseña
     * @type {Date}
     */
    @ApiProperty({ example: '05-06-2025', description: 'Fecha de la Publicacion de la Crítica' })
    @Column({ name: 'review_date', type: 'timestamp' })
    reviewDate: Date

    /**
     * Usuarios relacionados a la reseña
     * @type {User}
     */
    @ManyToOne(() => User)
    @JoinColumn({ name: "id_user", referencedColumnName: "id" })
    user: User;

    /**
     * Librs relacionados a la reseña
     * @type {Libro}
     */
    @ApiProperty({ description: 'Libro al que pertenece la crítica' })
    @ManyToOne(() => Book, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_book' })
    book: Book;

}