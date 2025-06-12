import { APP_FILTER } from '@nestjs/core';
import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('books')
export class Book {
  @ApiProperty({example: 1, description: 'ID Único de Libros'})
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  id_usuario: number;

  @Column()
  id_book: number;

  @Column()
  cantidad: number;

  @Column({ default: false })
  subscriber_exclusive!: boolean;

  @Column('float')
  price!: number;
}