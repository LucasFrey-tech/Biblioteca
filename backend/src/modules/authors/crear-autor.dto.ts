import { IsString, MinLength } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @MinLength(1)
  name: string;
}