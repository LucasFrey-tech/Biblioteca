import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('shopping_cart')
export class ShoppingCart {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'id_user', type: 'integer' })
    idUser: number;

    @Column({name: 'id_book', type: 'integer' })
    idBook: number;

    @Column('amount')
    amount: number;
}