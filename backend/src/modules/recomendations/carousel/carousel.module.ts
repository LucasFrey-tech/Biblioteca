import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarouselService } from './carousel.service';
import { CarouselController } from './carousel.controller';
import { Carousel } from 'src/entidades/carousel.entity';
import { Book } from 'src/entidades/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carousel, Book])],
  controllers: [CarouselController],
  providers: [CarouselService],
  exports: [CarouselService],
})
export class CarouserModule {}