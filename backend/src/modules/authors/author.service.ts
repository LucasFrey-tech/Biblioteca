import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException, Logger } from "@nestjs/common";
import { Author } from "../../entidades/author.entity";
import { CreateAuthorDto } from "./dto/crear-autor.dto";
import { PaginatedAuthorsDTO } from "./dto/authorPAG.dto";

/**
 * Servicio que maneja la lógica de negocio para los autores de un libro.
 */
@Injectable()
export class AuthorService {
    private readonly logger = new Logger(AuthorService.name);
    constructor(
        @InjectRepository(Author)
        private authorRepository: Repository<Author>,
    ) { }

    /**
     * Obtiene todos los autores disponibles.
     * 
     * @returns {Promise<Author[]>} Una promesa que resuelve con la lista de todos los autores
     */
    async findAll(): Promise<Author[]> {
        const authors = await this.authorRepository.find();
        this.logger.log('Lista de Autores Obtenida (sin paginación)');
        return authors;
    }

    /**
     * Obtiene todos los autores disponibles con paginación.
     * 
     * @param {number} page - Página solicitada (basada en 1)
     * @param {number} limit - Cantidad de autores por página
     * @returns {Promise<PaginatedAuthorsDTO>} Una promesa que resuelve con un objeto que contiene la lista de autores y el total
     */
    async findAllPaginated(page: number = 1, limit: number = 10): Promise<PaginatedAuthorsDTO> {
        const skip = (page - 1) * limit;
        const [authors, total] = await this.authorRepository.findAndCount({
            skip,
            take: limit,
        });

        this.logger.log('Lista de Autores Obtenida (paginada)');
        return { authors, total };
    }

    /**
     * Busca un autor específico por su ID.
     * 
     * @param {number} id - El ID del autor a buscar.
     * @returns {Promise<Author>} Una promesa que resuelve con el autor encontrado.
     * @throws {NotFoundException} Si no encuentra ningún autor con el ID especificado.
     */
    async findOne(id: number): Promise<Author> {
        const author = await this.authorRepository.findOne({
            where: { id }
        });

        if (!author) {
            this.logger.log('Autor No Encontrado');
            throw new NotFoundException(`Author with ID ${id} not found`);
        }
        this.logger.log('Autor Encontrado');
        return author;
    }

    /**
     * Crea un nuevo autor en el sistema.
     * 
     * @param {CreateAuthorDto} createAuthorDto - Objeto de transferencia de datos con la información para crear un autor.
     * @returns {Promise<Author>} Promesa que resuelve con la entidad del autor recién creada.
     */
    async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
        const author = this.authorRepository.create(createAuthorDto);
        this.logger.log('Autor Creado');
        return this.authorRepository.save(author);
    }

    /**
     * Elimina un autor específico de la base de datos
     *
     * @param {number} id - ID del autor a eliminar
     */
    async remove(id: number): Promise<void> {
        const result = await this.authorRepository.delete(id);
        if (result.affected === 0) {
            this.logger.log('Autor No Encontrado');
            throw new NotFoundException(`Author with ID ${id} not found`);
        }
        this.logger.log('Autor Eliminado');
    }
}