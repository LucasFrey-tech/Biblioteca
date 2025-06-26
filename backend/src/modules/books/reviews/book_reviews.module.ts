import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entidades/user.entity';
import { Review} from '../../../entidades/review.entity';
import {BookReviewsController} from './book_reviews.controller'
import { BookReviewsService } from './book_reviews.service';

/**
 * Módulo de NestJS que agrupa los componentes relacionados a Review:
 * - Controlador
 * - Servicio
 * - Repositorios TypeORM
 */
@Module({
  imports: [TypeOrmModule.forFeature([Review, User])],
  controllers: [BookReviewsController],
  providers: [BookReviewsService],
})
export class BookReviewsModule {}