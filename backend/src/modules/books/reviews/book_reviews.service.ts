import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Review } from "src/entidades/review.entity";

@Injectable()
export class BookReviewsService {
    constructor(
        @InjectRepository(Review)
        private reviewRepository: Repository<Review>,
    ) { }

    findAll(): Promise<Review[]> {
        return this.reviewRepository.find({});
    }

    async findOne(id: number): Promise<Review> {
        const review = await this.reviewRepository.findOne({
            where: { id }
        });

        if (!review) {
            throw new NotFoundException(`Review with ID ${id} not found`);
        }

        return review;
    }

    async findByBookId(bookId: number): Promise<Review[]> {
        return this.reviewRepository.find({
            where: { idBook: bookId }
        });
    }

    async remove(id: number): Promise<void> {
        const result = await this.reviewRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Review with ID ${id} not found`);
        }
    }
}