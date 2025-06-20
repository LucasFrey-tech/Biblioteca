import * as bcrypt from 'bcrypt';
import { Injectable, Logger } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { User } from '../../entidades/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async findAll(search = ''): Promise<User[]> {
    this.logger.log('Lista de Usuarios Obtenida');
    return this.usersRepository.find({
      where: [
        { firstname: ILike(`%${search}%`) },
        { lastname: ILike(`%${search}%`) },
        { email: ILike(`%${search}%`) }
      ],
      order: { id: 'ASC' },
    });
  }

    async findOne(id: number) {
      this.logger.log('Usuario Encontrado con Subscripciones');
      return await this.usersRepository.findOne({
        where: { id },
        relations: ['userSubscriptions', 'userSubscriptions.subscription'],
      });
    }


  async create(user: Partial<User>) {
    const existingUserEmail = await this.usersRepository.findOne({ where: { email: user.email } });
    const existingUserName = await this.usersRepository.findOne({ where: { username: user.username } });
    // Si el que registra es tanto un mail como un username
    if (existingUserEmail && existingUserName) {
      this.logger.log('Correo y Nombre de Usuario ya registrado');
      throw new BadRequestException('El correo y el nombre de usuario ya están registrados');
    }
    // Caso de que el usuario ingrese el mismo mail
    if (existingUserEmail) {
      this.logger.log('Correo ya Registrado');
      throw new BadRequestException('El correo ya está registrado');
    }
    // Caso de que el usuario ingrese el mismo nombre de usuario
    if (existingUserName) {
      this.logger.log('Nombre de Usuario ya registrado');
      throw new BadRequestException('Este nombre de usuario ya existe');
    }

    this.logger.log('Cuenta de Usuario Creada');
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    this.logger.log('Usuario Encontrado por Email');
    return this.usersRepository.findOne({ where: { email } });
  }
  async findByUser(username: string): Promise<User | null> {
    this.logger.log('Usuario Encontrado por Nombre de Usuario');
    return this.usersRepository.findOne({ where: { username } });
  }

  async update(id: number, updateData: Partial<User>) {
    if (updateData.password) {
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(updateData.password, saltRounds);
    }

    this.logger.log('Usuario Actualizado');

    await this.usersRepository.update(id, updateData);
    return this.findOne(id);
  }

  delete(id: number) {
    this.logger.log('Usuario Borrado')
    return this.usersRepository.delete(id);
  }
}