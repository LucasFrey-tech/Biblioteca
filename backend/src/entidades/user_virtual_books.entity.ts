import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

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
}