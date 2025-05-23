import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { BookReviewsService } from './book_reviews.service';
import { Book } from '../../../entidades/book.entity';

@Controller('reviews')
export class BookReviewsController {

}