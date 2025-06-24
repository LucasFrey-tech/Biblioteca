import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { Book } from './book.entity';

/**
 * Entidad que representa una compra en el sistema.
 * 
 * Esta clase mapea la tabla 'pruchases' en la base de datos y establece las relaciones
 * con las entidades de User y Book
 */
@Entity('purchases')
export class Purchase {

  /**
   * ID único de la compra
   * @type {number}
   */
  @ApiProperty({ example: 1, description: 'ID Único de la Compra' })
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Cantidad de libros comprados
   * @type {number}
   */
  @ApiProperty({ example: 20000, description: 'Cantidad de libros' })
  @Column({ name: 'amount', type: 'integer' })
  amount: number;

  /**
   * Precio de la compra
   * @type {number}
   */
  @ApiProperty({ example: 'El Principito', description: 'Valor de la compra' })
  @Column({ name: 'price', type: 'integer' })
  price: number

  /**
   * Formato del libro comprado
   * @type {boolean}
   */
  @ApiProperty({ description: 'Tipo de libro' })
  @Column({ default: false })
  virtual: boolean;

  /**
   * Fecha de la compra
   * @type {Date}
   */
  @ApiProperty({ example: '2025-06-10T12:38:00Z', description: 'Fecha de la Compra' })
  @Column({ name: 'purchase_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  purchaseDate: Date;

  /**
   * Usuarios relacionados con la compra
   * @type {User}
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: "id_user", referencedColumnName: "id" })
  user: User;

  /**
   * Libros relacionados con la compra
   * @type {Book}
   */
  @ManyToOne(() => Book)
  @JoinColumn({ name: "id_book", referencedColumnName: "id" })
  book: Book;
}