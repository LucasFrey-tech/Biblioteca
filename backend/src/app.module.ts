import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entidades
import { User } from './entidades/user.entity';
import { Book } from './entidades/book.entity';
import { Author } from './entidades/author.entity';
import { Review } from './entidades/review.entity';
import { Genre } from './entidades/genre.entity';
import { BookGenre } from './entidades/book_genres.entity';


// Modulos
import { UsersModule } from './modules/users/user.module';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './modules/books/book/book.module';
import { AuthorModule } from './modules/authors/author.module';
import { BookReviewsModule } from './modules/books/reviews/book_reviews.module';
import { GenresModule } from './modules/genres/genre.module';

//Controllers
import { BooksController } from './modules/books/book/book.controller';
import { AuthorController } from './modules/authors/author.controller';
import { BookReviewsController } from './modules/books/reviews/book_reviews.controller';

//Service
import { BooksService } from './modules/books/book/book.service';
import { AuthorService } from './modules/authors/author.service';
import { BookReviewsService } from './modules/books/reviews/book_reviews.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin123',
      database: 'alejandria',
      entities: [User, Book, Author, Review],
      // entities: [Book, Author, Genre, BookGenre],
      synchronize: false, 
    }),
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forFeature([User, Book, Author, Review]),
    // TypeOrmModule.forFeature([User, Book, Genre, BookGenre]),
    UsersModule,
    AuthorModule,
    BooksModule,
    BookReviewsModule,
    // GenresModule,
  ],
  controllers: [BooksController, AuthorController, BookReviewsController],
  providers: [BooksService, AuthorService, BookReviewsService],
})
export class AppModule {}