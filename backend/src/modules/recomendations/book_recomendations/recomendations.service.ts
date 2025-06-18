import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BookRecommendation } from "src/entidades/book_recommendations.entity";
import { Repository } from "typeorm";
import { RecommendationDTO } from "./recomendations.dto";


@Injectable()
export class RecomendationsService {
    constructor(
        @InjectRepository(BookRecommendation)
        private recomendationsRepository: Repository<BookRecommendation>,
    ) { }

    async create(body: RecommendationDTO): Promise<RecommendationDTO> {
        const author = this.recomendationsRepository.create(body);
        return this.recomendationsRepository.save(author);
    }

    findAll(): Promise<RecommendationDTO[]> {
        return this.recomendationsRepository.find({});
    }

    async findOne(id: number): Promise<RecommendationDTO> {
        const author = await this.recomendationsRepository.findOne({
            where: { id }
        });

        if (!author) {
            throw new NotFoundException(`Recomendation with ID ${id} not found`);
        }
        return author;
    }

    async remove(id: number): Promise<void> {
        const result = await this.recomendationsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Recomendation with ID ${id} not found`);
        }
    }
}