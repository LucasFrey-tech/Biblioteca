import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from 'src/entidades/genre.entity';

@Injectable()
export class GenresService {
  async delete(id: number): Promise<void> {
    await this.genreRepository.delete(id);
  }
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

}