import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Book } from './book.entity';

@Entity('book_recommendations')
export class BookRecommendation {
    @ApiProperty({ example: 1, description: 'ID Único del BookRecomendation' })
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({ example: 1, description: 'ID Único del libro' })
    @Column({ name: 'book_id', type: 'integer' })
    idBook: number;

    @ManyToOne(() => Book)
    @JoinColumn({ name: "book_id", referencedColumnName: "id" })
    book: Book;
}