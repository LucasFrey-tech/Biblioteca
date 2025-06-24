import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsBoolean()
  admin?: boolean;

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