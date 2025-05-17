import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Genre } from '../entidades/genre.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tittle: string;

  @Column()
  author_id: number;

  @Column('text')
  description: string;

  @Column({ unique: true })
  isbn: string;

  @Column({ default: '' })
  image: string;

  @Column()
  stock: number;

  @Column({ default: false })
  subscriber_exclusive: boolean;

  @Column('float')
  price: number;

  @ManyToMany(() => Genre)
  @JoinTable({
    name: 'book_genres',
    joinColumn: { name: 'id_book', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'id_genre', referencedColumnName: 'id' }
  })
  genres: Genre[];
}