import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne} from 'typeorm';
import { Book } from './book.entity';

@Entity('user_virtual_books')
export class UserVirtualBooks{
    @ApiProperty({example: 1, description: 'ID Único'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 1, description: 'ID Único del Usuario'})
    @Column({name: 'id_user', type: 'integer' })
    idUser: number;

    @ApiProperty({example: 1, description: 'ID Único del Libro'})
    @Column({name: 'id_book', type: 'integer' })
    idBook: number;

    @ManyToOne(() => Book)
    @JoinColumn({ name: "id_book", referencedColumnName: "id" })
    book: Book;
}