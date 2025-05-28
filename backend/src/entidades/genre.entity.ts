import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BookGenre } from './book_genres.entity';

@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => BookGenre, (bg) => bg.idGenre)
  booksRelations: BookGenre[];
}