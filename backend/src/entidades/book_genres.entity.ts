import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';


@Entity('book_genres')
export class BookGenre {
    @ApiProperty({example: 1, description: 'ID Único de Libro y Genero'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 1, description: 'ID Único de Libro'})
    @Column({name: 'id_book', type: 'integer' })
    id_book: number;

    @ApiProperty({example: 1, description: 'ID Único de Genero'})
    @Column({name: 'id_genre', type: 'integer' })
    id_genre: number;
}