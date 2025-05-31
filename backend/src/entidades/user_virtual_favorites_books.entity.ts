import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('user_virtual_favorites_books')
export class UserFavoriteBook {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'id_user', type: 'integer' })
    idUser: number;

    @Column({name: 'id_book', type: 'integer' })
    idBook: number;
}