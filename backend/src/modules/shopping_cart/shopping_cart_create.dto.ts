import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsBoolean } from 'class-validator';

export class ShoppingCartCreateDTO {
  @ApiProperty({ example: 7, description: 'ID del usuario que realiza la compra' })
  @IsInt()
  idUser: number;

  @ApiProperty({ example: 15, description: 'ID del libro que se añade al carrito' })
  @IsInt()
  idBook: number;

  @ApiProperty({ example: 3, description: 'Cantidad de unidades del libro' })
  @IsInt()
  amount: number;

  @ApiProperty({ example: false, description: 'Indica si el libro es versión virtual (ebook)' })
  @IsBoolean()
  virtual: boolean;
}
