import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('shopping_cart_book')
export class ShoppingCartBook {
    @ApiProperty({example: 1, description: 'ID Único del Carrito'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 1, description: 'ID Único del Usuario'})
    @Column({name: 'id_user', type: 'integer' })
    idUser: number;

    @ApiProperty({example: 1, description: 'ID Único del Libro'})
    @Column({name: 'id_book', type: 'integer' })
    idBook: number;

    @ApiProperty({example: 20000, description: 'Valor Total del Carrito'})
    @Column('amount')
    amount: number;
}