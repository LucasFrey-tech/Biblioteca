import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id_user: number;

    @Column({type: "varchar", length: 255})
    name: string;

    @Column({type: "varchar", length: 255})
    password: string;
    
    @Column({type: "varchar", length: 255, unique: true})
    email: string;

    @Column({type: "varchar", length: 255})
    role: string;

    @CreateDateColumn()
    registration_date: Date;

    @Column({type: "varchar", length: 50, default: 'free'})
    plan: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}