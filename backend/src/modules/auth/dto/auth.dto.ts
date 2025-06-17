import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginRequestBody {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
  constructor(
    email: string,
    password: string
  ) {
    this.email = email;
    this.password = password;
  }
}

export class RegisterRequestBody {
  @IsString()
  username: string;

  @IsString()
  firstname: string;
  
  @IsString()
  lastname: string;
  
  @IsEmail()
  email: string;

  @IsString()
  image: string;

  @IsString()
  @MinLength(6)
  password: string;

  constructor(
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    image: string,
    password: string
  ) {
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.image = image;
    this.password = password;
  }
}
