import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('carousel')
export class BookRecommendation {
    @ApiProperty({ example: 1, description: 'ID Único de la recomendación' })
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({ example: 1, description: 'ID Único del libro' })
    @Column({ name: 'id_book', type: 'integer' })
    idBook: number;
}