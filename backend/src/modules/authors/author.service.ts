import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException, Logger } from "@nestjs/common";
import { Author } from "../../entidades/author.entity";
import { CreateAuthorDto } from "./crear-autor.dto";

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
     * Obtiene todods los autores disponibles.
     * 
     * @returns {Promise<Author[]>} Una promesa que resuelve con un arreglo de DTOs de autores 
     */
    async findAll(): Promise<Author[]> {
        this.logger.log('Lista de Autores Obtenida');
        return this.authorRepository.find({});
    }

    /**
     * Busca un autor específico por su ID.
     * 
     * @param {number} id - El ID del autor a buscar.
     * @returns {Promise<Author>} Una promesa que resuelve con el autor encontrado.
     * @throws {NotFoundException} Si no encuentra ningun autor con el ID específicado.
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