import { IsInt, IsBoolean } from 'class-validator';

export class ShoppingCartCreateDTO {
  @IsInt()
  idUser: number;

  @IsInt()
  idBook: number;

  @IsInt()
  amount: number;

  @IsBoolean()
  virtual: boolean;
}
