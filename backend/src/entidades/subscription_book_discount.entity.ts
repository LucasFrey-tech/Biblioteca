import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('subscription_book_discount')
export class SubscriptionBookDiscount{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({name: 'id_book', type: 'integer' })
    idBook: number;

    @Column({type: 'float' })
    discount: number;
}