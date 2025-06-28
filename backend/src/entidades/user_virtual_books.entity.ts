import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne} from 'typeorm';
import { Book } from './book.entity';
import { User } from './user.entity';

@Entity('user_virtual_books')
export class UserVirtualBooks{
    @ApiProperty({example: 1, description: 'ID Único'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ type: () => User, description: "Usuario Asociado"})
    @ManyToOne(() => User)
    @JoinColumn({ name: 'id_user', referencedColumnName: 'id' })
    user: User;

    @ApiProperty({ type: () => Book, description: "Libro Asociado"})
    @ManyToOne(() => Book)
    @JoinColumn({ name: "id_book", referencedColumnName: "id" })
    book: Book;
}