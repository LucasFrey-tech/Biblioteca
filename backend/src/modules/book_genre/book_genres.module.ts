import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookGenre } from 'src/entidades/book_genres.entity';
import { BookGenresService } from './book_genres.service';
import { BookGenresController } from './book_genres.controller';
import { Genre } from 'src/entidades/genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookGenre, Genre])],
  controllers: [BookGenresController],
  providers: [BookGenresService],
  exports: [BookGenresService],
})
export class BookGenresModule {}