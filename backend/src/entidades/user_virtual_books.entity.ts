import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne} from 'typeorm';
import { Book } from './book.entity';
import { User } from './user.entity';

@Entity('user_virtual_books')
export class UserVirtualBooks{
    @ApiProperty({example: 1, description: 'ID Único'})
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'id_user', referencedColumnName: 'id' })
    user: User;

    @ManyToOne(() => Book)
    @JoinColumn({ name: "id_book", referencedColumnName: "id" })
    book: Book;
}