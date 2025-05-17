import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  admin: boolean;

  @Column({ default: false })
  disabled: boolean;

  @Column({ default: '' })
  image: string;

  @CreateDateColumn({ name: 'registration_date' })
  registrationDate: Date;
}