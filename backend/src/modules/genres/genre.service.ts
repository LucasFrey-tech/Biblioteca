import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from '../../../src/entidades/genre.entity';
import { PaginatedGenresDTO } from './dto/genre.dto';

/**
 * Servicio que maneja la lógica de negocio para los géneros
 */
@Injectable()
export class GenresService {
  private readonly logger = new Logger(GenresService.name);
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) { }

  /**
   * Obtiene todos los géneros disponibles.
   * 
   * @returns {Promise<Genre[]>} Una promesa que resuelve con la lista de todos los géneros
   */
  async findAll(): Promise<Genre[]> {
    const genres = await this.genreRepository.find();
    this.logger.log('Lista de Géneros Obtenida (sin paginación)');
    return genres;
  }

  /**
   * Obtiene todos los géneros disponibles con paginación
   * 
   * @param {number} page - Página solicitada (basada en 1)
   * @param {number} limit - Cantidad de géneros por página
   * @returns {Promise<PaginatedGenresDTO>} Una promesa que resuelve con un objeto que contiene la lista de géneros y el total
   */
  async findAllPaginated(page: number = 1, limit: number = 10): Promise<PaginatedGenresDTO> {
    const skip = (page - 1) * limit;
    const [genres, total] = await this.genreRepository.findAndCount({
      skip,
      take: limit,
    });

    this.logger.log('Lista de Géneros Obtenida (paginada)');
    return { genres, total };
  }

  /**
   * Crea un nuevo género en el sistema.
   * 
   * @param {Partial<Genre>} genre - Objeto de transferencia de datos con la información del género a crear
   * @returns {Promise<Genre>} - Promesa que resuelve con la entidad de géneros recién creada
   */
  async create(genre: Partial<Genre>): Promise<Genre> {
    const newGenre = this.genreRepository.create(genre);
    this.logger.log('Género Creado');
    return this.genreRepository.save(newGenre);
  }

  /**
   * Elimina un género específico
   * 
   * @param {number} id - ID del género a eliminar
   * @throws {NotFoundException} Cuando un género con la ID buscada no es encontrado
   */
  async delete(id: number): Promise<void> {
    const result = await this.genreRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Género con id ${id} no encontrado`);
    }
  }
}