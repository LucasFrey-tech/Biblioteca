import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Author } from "../../entidades/author.entity";
import { CreateAuthorDto } from "./crear-autor.dto";

@Injectable()
export class AuthorService {
    constructor(
        @InjectRepository(Author)
        private authorRepository: Repository<Author>,
    ) { }

    async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = this.authorRepository.create(createAuthorDto);
    return this.authorRepository.save(author);
}

    findAll(): Promise<Author[]> {
        return this.authorRepository.find({});
    }

    async findOne(id: number): Promise<Author> {
    const author = await this.authorRepository.findOne({
        where: { id }
    });

    if (!author) {
        throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
    }

    async remove(id: number): Promise<void> {
        const result = await this.authorRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Author with ID ${id} not found`);
        }
    }
}