import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
@Entity('virtual_book_content')
export class VirtualBookContent{
    @ApiProperty({example: 1, description: 'ID Único'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 1, description: 'ID Único del Libro'})
    @Column({name: 'id_book', type: 'integer' })
    idBook: number;

    @ApiProperty({description: 'Texto del Libro'})
    @Column({type: 'text'})
    content: string;
}