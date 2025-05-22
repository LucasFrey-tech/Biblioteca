import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('book_genres')
export class BookGenre {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'id_book', type: 'integer' })
    idBook: number;

    @Column({name: 'id_genre', type: 'integer' })
    idGenre: number;
}