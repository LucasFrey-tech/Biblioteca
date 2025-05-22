import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('virtual_book_content')
export class VirtualBookContent{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'id_book', type: 'integer' })
    idBook: number;

    @Column({type: 'text'})
    content: string;
}