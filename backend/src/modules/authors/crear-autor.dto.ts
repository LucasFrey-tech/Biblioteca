import { IsString, MinLength } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @MinLength(1)
  name: string;

  constructor(
    name: string
  ) {
    this.name = name;
  }
}