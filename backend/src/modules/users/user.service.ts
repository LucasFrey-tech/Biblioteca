import * as bcrypt from 'bcrypt';
import { Injectable, Logger } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { User } from '../../entidades/user.entity';
import { Log } from '../../logger/logger';

@Injectable()
export class UsersService {
  private readonly logger = Log.getLogger(UsersService.name);
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async findAllPaginated(page: number = 1, limit: number = 10, search: string = ''): Promise<{ items: User[]; total: number }> {
    this.logger.info(`Lista de Usuarios Obtenida (paginada, página: ${page}, límite: ${limit}, búsqueda: ${search})`);
    const [items, total] = await this.usersRepository.findAndCount({
      where: [
        { firstname: ILike(`%${search}%`) },
        { lastname: ILike(`%${search}%`) },
        { email: ILike(`%${search}%`) },
      ],
      order: { id: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total };
  }

  async findAll(search: string = ''): Promise<User[]> {
    this.logger.info('Lista de Usuarios Obtenida');
    return this.usersRepository.find({
      where: [
        { firstname: ILike(`%${search}%`) },
        { lastname: ILike(`%${search}%`) },
        { email: ILike(`%${search}%`) },
      ],
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<User | null> {
    this.logger.info('Usuario Encontrado con Subscripciones');
    return await this.usersRepository.findOne({
      where: { id },
      relations: ['userSubscriptions', 'userSubscriptions.subscription'],
    });
  }

  async create(user: Partial<User>) {
    const existingUserEmail = await this.usersRepository.findOne({ where: { email: user.email } });
    const existingUserName = await this.usersRepository.findOne({ where: { username: user.username } });
    if (existingUserEmail && existingUserName) {
      this.logger.info('Correo y Nombre de Usuario ya registrado');
      throw new BadRequestException('El correo y el nombre de usuario ya están registrados');
    }
    if (existingUserEmail) {
      this.logger.info('Correo ya Registrado');
      throw new BadRequestException('El correo ya está registrado');
    }
    if (existingUserName) {
      this.logger.info('Nombre de Usuario ya registrado');
      throw new BadRequestException('Este nombre de usuario ya existe');
    }

    this.logger.info('Cuenta de Usuario Creada');
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    this.logger.info('Usuario Encontrado por Email');
    return this.usersRepository.findOne({ where: { email } });
  }

  async findByUser(username: string): Promise<User | null> {
    this.logger.info('Usuario Encontrado por Nombre de Usuario');
    return this.usersRepository.findOne({ where: { username } });
  }

  async update(id: number, updateData: Partial<User>) {
    if (updateData.password) {
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(updateData.password, saltRounds);
    }

    this.logger.info('Usuario Actualizado');
    await this.usersRepository.update(id, updateData);
    return this.findOne(id);
  }

  async delete(id: number) {
    this.logger.info('Usuario Borrado');
    return this.usersRepository.delete(id);
  }
}