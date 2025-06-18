import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, JoinTable, ManyToMany } from 'typeorm';
import { User } from './user.entity';
import { Book } from './book.entity';

@Entity('shopping_cart_book')
export class ShoppingCartBook {
    @ApiProperty({ example: 1, description: 'ID Único del Carrito' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 1, description: 'ID Único del Usuario' })
    @Column({ name: 'id_user', type: 'integer' })
    idUser: number;

    @ApiProperty({ example: 1, description: 'ID Único del Libro' })
    @Column({ name: 'id_book', type: 'integer' })
    idBook: number;

    @ApiProperty({ example: 20000, description: 'Valor Total del Carrito' })
    @Column({ name: 'amount', type: 'integer' })
    amount: number;

    @ApiProperty({ description: 'Tipo de libro' })
    @Column({ default: false })
    virtual!: boolean;

    @ManyToOne(() => User)
    @JoinColumn({ name: "id_user", referencedColumnName: "id" })
    user: User;

    @ManyToOne(() => Book)
    @JoinColumn({ name: "id_book", referencedColumnName: "id" })
    book: Book;
}