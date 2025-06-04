import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('reviews')
export class Review{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'id_user', type: 'integer' })
    id_user: number;

    @Column({name: 'id_book', type: 'integer' })
    idBook: number;

    @Column({type: 'smallint'})
    rating: number;

    @Column({length: 350})
    comment: string;

    @Column({name: 'review_date', type: 'timestamp' })
    reviewDate: Date
}