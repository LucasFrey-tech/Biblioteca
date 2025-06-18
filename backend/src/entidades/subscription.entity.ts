import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity('user_subscription')
export class Subscription {
    @ApiProperty({example: 1, description: 'ID Único'})
    @PrimaryGeneratedColumn()
    id:number;

    @ApiProperty({example: '14000', description: 'Precio de la Suscripción'})
    @Column({ name: 'price', type: 'float' })
    price: number;
}