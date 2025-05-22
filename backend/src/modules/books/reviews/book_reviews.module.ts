import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review} from '../../../entidades/review.entity';
import {BookReviewsController} from './book_reviews.controller'
import {BookReviewsService} from './book_reviews.service'

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  controllers: [BookReviewsController],
  providers: [BookReviewsService],
})
export class BookReviewsModule {}