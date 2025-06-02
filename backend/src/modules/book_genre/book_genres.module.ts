import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookGenre } from 'src/entidades/book_genres.entity';
import { BookGenresService } from './book_genres.service';
import { BookGenresController } from './book_genres.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BookGenre])],
  controllers: [BookGenresController],
  providers: [BookGenresService],
  exports: [BookGenresService],
})
export class BookGenresModule {}