import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from '../../../src/entidades/genre.entity';

/**
 * Servicio que maneja la lógica de negocio para los generos
 */
@Injectable()
export class GenresService {
  private readonly logger = new Logger(GenresService.name);
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) { }

  /**
   * Obtiene todos los generos disponibles
   * 
   * @returns {Promise<Genre[]>} Una promesa que resuelve con un arreglo de DTOs de generos.
   * 
   */
  async findAll(): Promise<Genre[]> {
    this.logger.log('Lista de Generos Obtenida');
    return this.genreRepository.find();
  }

  /**
   * Crea un nuevo genero en el sistema.
   * 
   * @param {Partial<Genre>} genre - Objeto de transferencia de datos con la información del genero a crear
   * @returns {Promise<Genre>} - Promesa que resuelve con la entidad de generos recién creada
   */
  async create(genre: Partial<Genre>): Promise<Genre> {
    const newGenre = this.genreRepository.create(genre);
    this.logger.log('Genero Creado');
    return this.genreRepository.save(newGenre);
  }

  /**
   * Elimina un genero especifico
   * 
   * @param {number} id - ID del genero a eliminar
   * @throws {NotFoundException} Cuando un genero con la ID buscada no es encontrada
   */
  async delete(id: number): Promise<void> {
    const result = await this.genreRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Género con id ${id} no encontrado`);
    }
  }

}