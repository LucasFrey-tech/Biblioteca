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
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/user.module';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './modules/books/book/book.module';
import { AuthorModule } from './modules/authors/author.module';
import { BookReviewsModule } from './modules/books/reviews/book_reviews.module';
import { GenresModule } from './modules/genres/genre.module';
import { BookGenresModule } from './modules/book_genre/book_genres.module';


//Controllers
import { BooksController } from './modules/books/book/book.controller';
import { AuthorController } from './modules/authors/author.controller';
import { BookReviewsController } from './modules/books/reviews/book_reviews.controller';
import { GenresController } from './modules/genres/genre.controller';
import { BookGenresController } from './modules/book_genre/book_genres.controller';


//Service
import { BooksService } from './modules/books/book/book.service';
import { AuthorService } from './modules/authors/author.service';
import { BookReviewsService } from './modules/books/reviews/book_reviews.service';
import { GenresService } from './modules/genres/genre.service';
import { BookGenresService } from './modules/book_genre/book_genres.service';


const database_config = require('../private/database.config.json');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: database_config.host,
      port: database_config.port,
      username: database_config.username,
      password: database_config.password,
      database: database_config.database,
      entities: [User, Book, Author, Review, Genre, BookGenre],
      synchronize: false, 
    }),
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forFeature([User, Book, Author, Review, Genre, BookGenre]),
    AuthModule,
    UsersModule,
    AuthorModule,
    BooksModule,
    BookReviewsModule,
    GenresModule,
    BookGenresModule,

  ],
  controllers: [BooksController, AuthorController, BookReviewsController, GenresController, BookGenresController],
  providers: [BooksService, AuthorService, BookReviewsService, GenresService, BookGenresService],
})
export class AppModule {}