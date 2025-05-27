import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { Book } from './book.entity';

@Entity('authors')
export class Author {
    @PrimaryGeneratedColumn()
    id: number

    @Column( {length: 100 })
    name: string;

}