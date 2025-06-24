import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToOne} from 'typeorm';
import { User } from './user.entity';

@Entity('reviews')
export class Review{
    @ApiProperty({example: 1, description: 'ID Único de la Crítica'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 1, description: 'ID Único del Libro'})
    @Column({name: 'id_book', type: 'integer' })
    id_book: number;

    @ApiProperty({example: 5, description: 'Puntaje del 1 al 5'})
    @Column({type: 'smallint'})
    rating: number;

    @ApiProperty({example: 'Muy Bueno', description: 'Comentario sobre el Libro'})
    @Column({length: 350})
    comment: string;

    @ApiProperty({example: '05-06-2025', description: 'Fecha de la Publicacion de la Crítica'})
    @Column({name: 'review_date', type: 'timestamp' })
    reviewDate: Date

    @ManyToOne(() => User)
    @JoinColumn({ name: "id_user", referencedColumnName: "id" })
    user: User;
}