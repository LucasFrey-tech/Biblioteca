import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Book } from './book.entity';
@Entity('virtual_book_content')
export class VirtualBookContent {
    @ApiProperty({ example: 1, description: 'ID Único' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ type: () => Book })
    @ManyToOne(() => Book, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_book' })
    book: Book;

    @ApiProperty({ description: 'Texto del Libro' })
    @Column({ type: 'text' })
    content: string;
}