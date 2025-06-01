import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './book.service';
import { BooksController } from './book.controller';
import { Book } from '../../../entidades/book.entity';
import { Genre } from '../../../entidades/genre.entity';
import { Author } from '../../../entidades/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Genre, Author])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}