import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

/**
 * Data Transfer Object (DTO) para Register y Login.
 * Se usa para validar y transformar datos entre el cliente y el servidor.
 */

export class LoginRequestBody {

  /**
   * Email del usuario
   * @type {string}
   */
  @ApiProperty({example: "sarasa@gmail.com"})
  @IsEmail()
  email: string;

  /**
   * Contraseña del usuario
   * @type {string}
   */
  @ApiProperty({example: "123456"})
  @IsString()
  @MinLength(6)
  password: string;

  /**
   * Constructor del DTO. 
   */
  constructor(
    email: string,
    password: string
  ) {
    this.email = email;
    this.password = password;
  }
}

export class RegisterRequestBody {

  /**
   * Alias del usuario
   * @type {string}
   */
  @ApiProperty({example: "Tukson"})
  @IsString()
  username: string;

  /**
   * Nombre del usuario
   * @type {string}
   */
  @ApiProperty({example: "Lucas"})
  @IsString()
  firstname: string;
  
  /**
   * Apellido del usuario
   * @type {string}
   */
  @ApiProperty({example: "Frey"})
  @IsString()
  lastname: string;
  
  /**
   * Email del usuario
   * @type {string}
   */
  @ApiProperty({example: "sarasa@gmail.com"})
  @IsEmail()
  email: string;

  /**
   * Contraseña del usuario
   * @type {string}
   */
  @ApiProperty({example: "123456"})
  @IsString()
  @MinLength(6)
  password: string;

  /**
   * Constructor del DTO.
   */
  constructor(
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) {
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }
}
