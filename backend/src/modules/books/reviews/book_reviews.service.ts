import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException, Logger } from "@nestjs/common";
import { User } from "src/entidades/user.entity";
import { Review } from "src/entidades/review.entity";
import { ReviewI } from "./dto/review.dto";

@Injectable()
export class BookReviewsService {
    private readonly logger = new Logger(BookReviewsService.name);
    constructor(
        @InjectRepository(Review)
        private reviewRepository: Repository<Review>,

        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async create(reviewData: Partial<ReviewI>): Promise<ReviewI> {
        // Validar que exista el usuario
        const user = await this.userRepository.findOne({ 
            where: { id: reviewData.id_user } 
        });
        
        if (!user) {
            this.logger.log('Usuario No Encontrado');
            throw new NotFoundException(`User with ID ${reviewData.id_user} not found`);
        }

        // Crear la nueva review
        const newReview = this.reviewRepository.create({
            ...reviewData,
            reviewDate: new Date(),
        });

        const savedReview = await this.reviewRepository.save(newReview);

        // Retornar el DTO con los datos formateados
        this.logger.log('Critica Creada');
        return new ReviewI(
            savedReview.id,
            savedReview.id_user,
            savedReview.id_book,
            user.username,
            savedReview.comment,
            savedReview.rating,
            savedReview.reviewDate.toLocaleString('es-AR'),
        );
    }

    findAll(): Promise<Review[]> {
        this.logger.log('Lista de Criticas Obtenida');
        return this.reviewRepository.find({});
    }

    async findOne(id: number): Promise<Review> {
        const review = await this.reviewRepository.findOne({
            where: { id }
        });

        if (!review) {
            this.logger.log('Critica No Encontrada');
            throw new NotFoundException(`Review with ID ${id} not found`);
        }

        this.logger.log('Critica Obtenida');
        return review;
    }

    async findReviewsByBookId(bookId: number): Promise<ReviewI[]> {
        const reviews = await this.reviewRepository.find({
            where: { id_book: bookId }
        });

        const users = await this.userRepository.find({});

        const result = reviews.map((r) => {
            const user = users.find((u) => u.id === r.id_user);
            this.logger.log('');
            return new ReviewI(
                r.id,
                r.id_user,
                r.id_book,
                user ? user.username : "",
                r.comment,
                r.rating,
                r.reviewDate.toLocaleString('es-AR'),
            );
        });

        this.logger.log('Lista de Criticas por ID Libro Obtenida');
        return result;
    }

    async update(id: number, reviewData: ReviewI) {
        await this.reviewRepository.update(id, reviewData);
        this.logger.log('Critica Actualizada');
        return this.reviewRepository.findOne({ where: {id : id}});
    }

    async remove(id: number): Promise<void> {
        const result = await this.reviewRepository.delete(id);
        this.logger.log('Critica Eliminada');
        if (result.affected === 0) {
            this.logger.log('Critica No Encontrada');
            throw new NotFoundException(`Review with ID ${id} not found`);
        }
    }
}