import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from 'src/entidades/genre.entity';

@Injectable()
export class GenresService {
  private readonly logger = new Logger(GenresService.name);
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}

  findAll(): Promise<Genre[]> {
    this.logger.log('Lista de Generos Obtenida');
    return this.genreRepository.find();
  }

  create(genre: Partial<Genre>): Promise<Genre> {
    const newGenre = this.genreRepository.create(genre);
    this.logger.log('Genero Creado');
    return this.genreRepository.save(newGenre);
  }
    async delete(id: number): Promise<void> {
    const result = await this.genreRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Género con id ${id} no encontrado`);
    }
  }

}