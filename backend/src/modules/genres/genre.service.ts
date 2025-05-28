import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from 'src/entidades/genre.entity';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}

  findAll(): Promise<Genre[]> {
    return this.genreRepository.find();
  }

  create(genre: Partial<Genre>): Promise<Genre> {
    const newGenre = this.genreRepository.create(genre);
    return this.genreRepository.save(newGenre);
  }
}