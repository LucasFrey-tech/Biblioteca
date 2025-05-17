import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entidades/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }

  async create(user: Partial<User>) {
    const existing = await this.usersRepository.findOne({ where: { email: user.email } });
    if (existing) {
      throw new Error('El correo ya está registrado');
    }
    return this.usersRepository.save(user);
  }

  async update(id: number, updateData: Partial<User>) {
    await this.usersRepository.update(id, updateData);
    return this.findOne(id);
  }

  delete(id: number) {
    return this.usersRepository.delete(id);
  }
}