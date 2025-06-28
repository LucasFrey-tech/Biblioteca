import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
/**
 * DTO para la creación de un nuevo autor.
 */
export class CreateAuthorDto {

  /**
   * Nombre del autor.
   * @type {string}
   */
  @ApiProperty({example: "Roberto Kafka"})
  @IsString()
  @MinLength(1)
  name: string;

  /**
   * Constructor del DTO
   */
  constructor(
    name: string
  ) {
    this.name = name;
  }
}