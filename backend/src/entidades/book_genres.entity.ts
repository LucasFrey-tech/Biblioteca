import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Book } from './book.entity';
import { Genre } from './genre.entity';


@Entity('book_genres')
export class BookGenre {
    @ApiProperty({ example: 1, description: 'ID Único de Libro y Genero' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 1, description: 'ID Único de Libro' })
    @Column({ name: 'id_book', type: 'integer' })
    id_book: number;

    @ApiProperty({ example: 1, description: 'ID Único de Genero' })
    @Column({ name: 'id_genre', type: 'integer' })
    id_genre: number;

    @ManyToOne(() => Book)
    @JoinColumn({ name: "id_book", referencedColumnName: "id" })
    book: Book;

    @ManyToOne(() => Genre)
    @JoinColumn({ name: "id_genre", referencedColumnName: "id" })
    genre: Genre;
}