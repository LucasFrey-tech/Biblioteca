import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { BookReviewsService } from './book_reviews.service';


@Controller('reviews')
export class BookReviewsController {
    constructor(private readonly reviewService: BookReviewsService) { }

    @Get()
    findAll() {
        return this.reviewService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.reviewService.findOne(+id);
    }

    @Get('book/:bookId')
    findReviewsByBookId(@Param('bookId') bookId: string) {
        return this.reviewService.findReviewsByBookId(+bookId);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.reviewService.remove(+id);
    }
}