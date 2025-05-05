import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from "./user.entity";
import { Book } from './book.entity';

@Entity('shopping_cart')
export class Cart {
    @PrimaryGeneratedColumn()
    id_cart: number;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'id_user' })
    user: User;
    
    @ManyToOne(() => Book, { nullable: false })
    @JoinColumn({ name: 'id_book' })
    book: Book;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    creation_date: Date;
}