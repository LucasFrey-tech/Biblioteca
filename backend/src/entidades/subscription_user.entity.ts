import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('user_subscription')
export class UserSubscription {
    @ApiProperty({example: 1, description: 'ID Único'})
    @PrimaryGeneratedColumn()
    id:number;

    @ApiProperty({example: 1, description: 'ID Único del usuario'})
    @Column({ name: 'id_user' })
    idUser: number;

    @ApiProperty({example: '05-06-2025', description: 'Fecha Comienzo de Suscripción'})
    @Column({ name: 'start_date', type: 'timestamp' })
    startDate: Date;

    @ApiProperty({example: '05-06-2026', description: 'Fecha Finalizacion de Suscripción'})
    @Column({ name: 'end_date', type: 'timestamp' })
    endDate: Date;

    @ApiProperty({description: 'Validación de Suscripcion'})
    @Column({ default: false })
    ongoing: boolean;
}