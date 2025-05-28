import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import { Book } from './book.entity';
import { Genre } from './genre.entity';

@Entity('book_genres')
export class BookGenre {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'id_book', type: 'integer' })
    idBook: number;

    @Column({name: 'id_genre', type: 'integer' })
    idGenre: number;

    @ManyToOne(() => Book, (book) => book.genresRelations)
    @JoinColumn({ name: 'id_book', referencedColumnName: 'id'})
    book: Book;

  @ManyToOne(() => Genre, (genre) => genre.booksRelations)
  @JoinColumn({ name: 'id_genre', referencedColumnName: 'id' })
  genre: Genre;
}