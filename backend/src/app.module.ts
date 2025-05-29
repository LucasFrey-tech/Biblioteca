import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entidades
import { User } from './entidades/user.entity';
import { Book } from './entidades/book.entity';
import { Genre } from './entidades/genre.entity';
import { Author } from './entidades/author.entity';

// Modulos
import { BookGenre } from './entidades/book_genres.entity';
import { UsersModule } from './modules/users/user.module';
import { ConfigModule } from '@nestjs/config';
import { BooksController } from './modules/books/book/book.controller';
import { BooksService } from './modules/books/book/book.service';
import { GenresModule } from './modules/genres/genre.module';
import { BooksModule } from './modules/books/book/book.module';
import { AuthorService } from './modules/authors/author.service';
import { AuthorModule } from './modules/authors/author.module';
import { AuthorController } from './modules/authors/author.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin123',
      database: 'alejandria',
      entities: [User, Book, Author],
      // entities: [Book, Author, Genre, BookGenre],
      synchronize: true, 
    }),
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forFeature([User, Book, Author]),
    // TypeOrmModule.forFeature([User, Book, Genre, BookGenre]),
    UsersModule,
    AuthorModule,
    BooksModule,
    // GenresModule,
  ],
  controllers: [BooksController, AuthorController],
  providers: [BooksService, AuthorService],
})
export class AppModule {}