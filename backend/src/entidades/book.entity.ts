import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn, OneToMany } from 'typeorm';
import { Author } from './author.entity';
import { BookGenre } from './book_genres.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

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

  @ManyToOne(() => Author)
  @JoinColumn({ name: 'author_id', referencedColumnName: 'id' })
  author: Author;

  @OneToMany(() => BookGenre, (bookGenre) => bookGenre.idBook)
  genresRelations: BookGenre[];
}