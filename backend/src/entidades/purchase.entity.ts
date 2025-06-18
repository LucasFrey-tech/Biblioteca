import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { Book } from './book.entity';

@Entity('purchases')
export class Purchase {
  @ApiProperty({ example: 1, description: 'ID Único de la Compra' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1, description: 'ID Único del Usuario' })
  @Column({ name: 'id_user', type: 'integer' })
  idUser: number;

  @ApiProperty({ example: 1, description: 'ID Único del Libro' })
  @Column({ name: 'id_book', type: 'integer' })
  idBook: number;

  @ApiProperty({ example: 20000, description: 'Cantidad de libros' })
  @Column({ name: 'amount', type: 'integer' })
  amount: number;

  @ApiProperty({ example: 'El Principito', description: 'Valor de la compra' })
  @Column({ name: 'price', type: 'integer' })
  price: number

  @ApiProperty({ description: 'Tipo de libro' })
  @Column({ default: false })
  virtual: boolean;

  @ApiProperty({ example: '2025-06-10T12:38:00Z', description: 'Fecha de la Compra' })
  @Column({ name: 'purchase_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  purchaseDate: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "id_user", referencedColumnName: "id" })
  user: User;

  @ManyToOne(() => Book)
  @JoinColumn({ name: "id_book", referencedColumnName: "id" })
  book: Book;
}