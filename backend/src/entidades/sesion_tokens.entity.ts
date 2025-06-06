import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('sesion_tokens')
export class SesionToken {
    @ApiProperty({example: 1, description: 'ID Único de Registro de Token'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 1, description: 'ID Único de Libro'})
    @Column({name: 'id_user', type: 'integer' })
    idBook: number;

    @ApiProperty({example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30', description: 'Token'})
    @Column({type: 'text' })
    token: string;
}