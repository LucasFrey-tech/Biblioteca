import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository } from 'typeorm';
import { User } from '../../entidades/user.entity';
import { LoginRequestBody,RegisterRequestBody } from './auth.interface'

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  

  async Login(loginData: LoginRequestBody) {
    // revisar si existe un usuario con este correo.
    const result = await this.usersRepository.find({ where: { email: loginData.email} });

    // si existe revisar si la contraseña coincide.
    if(result.length > 0){
      const userData:User = result[0];
      if(userData.password === loginData.password)
        // si la contraseña coincide devolver 200
        return 200;
    }
    // si no devolver 400.
    return 400;
  }

  async Register(registerData: RegisterRequestBody){
    var newUser = new User();
    newUser.username = registerData.username;
    newUser.password = registerData.password;
    newUser.email = registerData.email;
    newUser.image = registerData.image;
    newUser.admin = false;
    newUser.disabled = false;

    try{
      await this.usersRepository.insert(newUser)
      return 200;
    }
    catch(e){
      return 400;
    }
  }
}