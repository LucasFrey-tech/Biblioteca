import { ApiProperty } from '@nestjs/swagger';

export class CreateUserVirtualBookDto {
    @ApiProperty({ example: 1, description: 'ID del usuario' })
    idUser: number;

    @ApiProperty({ example: 1, description: 'ID del libro' })
    idBook: number;
}