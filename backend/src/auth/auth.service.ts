import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entidades/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService
  ) {}

  async register(data: { username: string; email: string; password: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = this.userRepo.create({ ...data, password: hashedPassword });
    await this.userRepo.save(user);
    return { message: 'Usuario registrado' };
  }

  async login(data: { email: string; password: string }) {
    const user = await this.userRepo.findOne({ where: { email: data.email } });
    if (!user || user.disabled) {
      throw new Error('Usuario no válido o deshabilitado');
    }

    const match = await bcrypt.compare(data.password, user.password);
    if (!match) {
      throw new Error('Credenciales inválidas');
    }

    const payload = { id: user.id, email: user.email, admin: user.admin };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}