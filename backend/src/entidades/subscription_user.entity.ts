import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('user_subscription')
export class UserSubscription {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ name: 'id_user' })
    idUser: number;
    
    @Column({ name: 'start_date', type: 'timestamp' })
    startDate: Date;

    @Column({ name: 'end_date', type: 'timestamp' })
    endDate: Date;

    @Column({ default: false })
    ongoing: boolean;
}