// src/users/dto/update-user.dto.ts
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsBoolean()
  admin?: boolean;

  @IsOptional()
  @IsBoolean()
  disabled?: boolean;
}