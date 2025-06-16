import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { LoginRequestBody, RegisterRequestBody } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
  private usersService: UsersService,
  private jwtService: JwtService, 
) {}

  // REGISTRO
  async register(requestBody: RegisterRequestBody) {

    // Verificar si ya existe el usuario por email
    const existingUserEmail = await this.usersService.findByEmail(requestBody.email);
    // Verificar si ya existe el usuario por nombre de usuario
    const existingUserName = await this.usersService.findByUser(requestBody.username);
    
    console.log('existingUserEmail:', existingUserEmail);
    console.log('existingUserName:', existingUserName);

    if(existingUserEmail && existingUserName){
      throw new BadRequestException('El correo y el usuario ya existen!');
    }

    if (existingUserEmail) {
      throw new BadRequestException('El correo ya está registrado');
    }
    if(existingUserName) {
      throw new BadRequestException('Este nombre de usuario ya existe');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(requestBody.password, 10);

    // Crear usuario con contraseña hasheada
    const user = await this.usersService.create({
      ...requestBody,
      password: hashedPassword,
    });

    // No devolver la contraseña
    const { password, ...result } = user;
    return result;
  }

  // LOGIN

  async login(requestBody: LoginRequestBody) {
  // Validamos el usuario y la contraseña
  console.log(requestBody)
  const user = await this.validateUser(requestBody.email, requestBody.password);

  if (user.disabled) {
    throw new ForbiddenException('Usuario bloqueado. Contacta al administrador.');
  }

  // Creamos el payload del JWT (puedes agregar más info si querés)
  const payload = { email: user.email, sub: user.id, username: user.username, admin: user.admin}; //agregamos el username al payload para usarlo en el login

  // Firmamos el token
  const access_token = this.jwtService.sign(payload);

  // Devolvemos el token
  return { access_token };
}

// Función para validar usuario (la tienes, pero la dejo para contexto)
async validateUser(email: string, pass: string): Promise<any> {
  const user = await this.usersService.findByEmail(email);
  if (!user) throw new UnauthorizedException('Usuario no encontrado');

  const isMatch = await bcrypt.compare(pass, user.password);
  if (!isMatch) throw new UnauthorizedException('Contraseña incorrecta');

  const { password, ...result } = user;
  return result;
}
}
