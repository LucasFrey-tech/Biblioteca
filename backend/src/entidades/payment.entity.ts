import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('payment')
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    title: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    image: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;

    @Column({ type: 'boolean', nullable: false })
    virtual: boolean;

    @Column({ type: 'int', nullable: false })
    amount: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    total_due: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    delivery_location: string;

    @Column({ type: 'varchar', length: 4, nullable: true })
    card_last_four: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    payment_method: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'varchar', length: 50, nullable: false })
    status: string;
}