import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Review } from "../../../entidades/review.entity";
import { User } from "src/entidades/user.entity";


class ReviewI {
    constructor(
        id: number,
        username: string,
        comment: string,
        rating: number,
        reviewDate: string,
    ) { this.id = id, this.username = username, this.comment = comment, this.rating = rating, this.reviewDate = reviewDate }
    id: number;
    username: string;
    comment: string;
    rating: number;
    reviewDate: string;
};

@Injectable()
export class BookReviewsService {
    constructor(
        @InjectRepository(Review)
        private reviewRepository: Repository<Review>,

        @InjectRepository(User)
        private userRepository: Repository<User>,
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

    async findReviewsByBookId(bookId: number): Promise<ReviewI[]> {
        const reviews = await this.reviewRepository.find({
            where: { idBook: bookId }
        });

        const users = await this.userRepository.find({});

        const result = reviews.map((r) => {
            const idUsuario = r.id_user;
            const user = users.find((element) => element.id === idUsuario);
            return new ReviewI(
                r.id,
                user ? user.username : "",
                r.comment,
                r.rating,
                r.reviewDate.toLocaleTimeString('es-AR'),
            );
        });

        return result;
    }

    async remove(id: number): Promise<void> {
        const result = await this.reviewRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Review with ID ${id} not found`);
        }
    }
}