import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException, Logger } from "@nestjs/common";
import { Author } from "../../entidades/author.entity";
import { CreateAuthorDto } from "./crear-autor.dto";

@Injectable()
export class AuthorService {
    private readonly logger = new Logger(AuthorService.name);
    constructor(
        @InjectRepository(Author)
        private authorRepository: Repository<Author>,
    ) { }

    async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
        const author = this.authorRepository.create(createAuthorDto);
        this.logger.log('Autor Creado');
        return this.authorRepository.save(author);
    }

    findAll(): Promise<Author[]> {
        this.logger.log('Lista de Autores Obtenida');
        return this.authorRepository.find({});
    }

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

    async remove(id: number): Promise<void> {
        const result = await this.authorRepository.delete(id);
        if (result.affected === 0) {
            this.logger.log('Autor No Encontrado');
            throw new NotFoundException(`Author with ID ${id} not found`);
        }
        this.logger.log('Autor Eliminado');
    }
}