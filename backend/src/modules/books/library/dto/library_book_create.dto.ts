import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateUserVirtualBookDto {

    @ApiProperty({ example: 1, description: 'ID del usuario' })
    @IsInt()
    idUser: number;

    @ApiProperty({ example: 1, description: 'ID del libro' })
    @IsInt()
    idBook: number;

    constructor(
        idUser: number,
        idBook: number,
    ) {
        this.idUser = idUser;
        this.idBook = idBook;
    }
}