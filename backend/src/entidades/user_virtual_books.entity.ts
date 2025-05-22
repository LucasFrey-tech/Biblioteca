import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('user_virtual_books')
export class UserVirtualBooks{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'id_user', type: 'integer' })
    idUser: number;

    @Column({name: 'id_book', type: 'integer' })
    idBook: number;
}