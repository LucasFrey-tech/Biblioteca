import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entidades/user.entity';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }

  async create(user: Partial<User>) {
    const existingUserEmail = await this.usersRepository.findOne({ where: { email: user.email } });
    const existingUserName = await this.usersRepository.findOne({ where: { username: user.username } });
      // Si el que registra es tanto un mail como un username
    if (existingUserEmail && existingUserName) {
      throw new BadRequestException('El correo y el nombre de usuario ya están registrados');
    }
    // Caso de que el usuario ingrese el mismo mail
    if (existingUserEmail) {
      throw new BadRequestException('El correo ya está registrado');
    }
    // Caso de que el usuario ingrese el mismo nombre de usuario
    if (existingUserName) {
      throw new BadRequestException('Este nombre de usuario ya existe');
    }
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
  return this.usersRepository.findOne({ where: { email } });
}
  async findByUser(username: string): Promise<User | null> {
  return this.usersRepository.findOne({ where: {  username } });
}

  async update(id: number, updateData: Partial<User>) {
    await this.usersRepository.update(id, updateData);
    return this.findOne(id);
  }

  delete(id: number) {
    return this.usersRepository.delete(id);
  }
}


