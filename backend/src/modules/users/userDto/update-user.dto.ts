import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({example: true, description: "Estado de Admin"})
  @IsOptional()
  @IsBoolean()
  admin?: boolean;

  @ApiProperty({example: true, description: "Estado de Bloqueo"})
  @IsOptional()
  @IsBoolean()
  disabled?: boolean;

  constructor(
    admin?: boolean,
    disabled?: boolean
  ) {
    this.admin = admin;
    this.disabled = disabled;
  }
}