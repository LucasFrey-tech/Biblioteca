import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('subscription_book_discount')
export class SubscriptionBookDiscount{
    @ApiProperty({example: 1, description: 'ID Único'})
    @PrimaryGeneratedColumn()
    id:number;

    @ApiProperty({example: 1, description: 'ID Único del Libro'})
    @Column({name: 'id_book', type: 'integer' })
    idBook: number;

    @ApiProperty({example: 2000, description: 'Valor del Descuento'})
    @Column({type: 'float' })
    discount: number;
}