import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('sesion_tokens')
export class SesionToken {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'id_user', type: 'integer' })
    idBook: number;

    @Column({type: 'text' })
    token: string;
}