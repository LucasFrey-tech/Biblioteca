import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BookRecommendation } from "src/entidades/book_recommendations.entity";
import { Repository } from "typeorm";
import { RecommendationDTO } from "./recomendations.dto";
import { CreateRecommendationDTO } from "./create_recomendations.dto";
import { CreateBookDTO } from "src/modules/books/book/createBook.dto";


@Injectable()
export class RecomendationsService {
    constructor(
        @InjectRepository(BookRecommendation)
        private recomendationsRepository: Repository<BookRecommendation>,
    ) { }

    async findAll(): Promise<RecommendationDTO[]> {
        const bookRecomendation = await this.recomendationsRepository.find({ relations: ['book','book.author'] });
        const formatedBookRecomendation = bookRecomendation
            .map(x => new RecommendationDTO(x))
            .sort((a, b) => a.id - b.id)
            .slice(0, 8);
        return formatedBookRecomendation;
    }


    async findOne(id: number): Promise<RecommendationDTO> {
        const bookRecomendation = await this.recomendationsRepository.findOne({
            where: { id }
        });

        if (!bookRecomendation) {
            throw new NotFoundException(`Recomendation with ID ${id} not found`);
        }

        return new RecommendationDTO(bookRecomendation);
    }

    async create(body: CreateRecommendationDTO): Promise<RecommendationDTO> {
        const newBookRecomendation = this.recomendationsRepository.create(body);
        const bookRecomendationEntity = await this.recomendationsRepository.save(newBookRecomendation);

        // Recarga la entidad con la relación 'book'
        const loaded = await this.recomendationsRepository.findOne({
            where: { id: bookRecomendationEntity.id },
            relations: ['book'],
        });

        if (!loaded) {
            throw new NotFoundException(`Recomendation with ID ${bookRecomendationEntity.id} not found`);
        }

        return new RecommendationDTO(loaded)
    }

    async update(id:number, body: CreateRecommendationDTO): Promise<RecommendationDTO>{
        await this.recomendationsRepository.update(id,body);
        const updatedBookRecomendation = await this.recomendationsRepository.findOne({
            where: { id: id },
            relations: ['book'],
        });
        if (!updatedBookRecomendation) {
            throw new NotFoundException(`Recomendation with ID ${id} not found`);
        }
        return new RecommendationDTO(updatedBookRecomendation);
    }

    async remove(id: number): Promise<void> {
        const result = await this.recomendationsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Recomendation with ID ${id} not found`);
        }
    }
}