import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entidades
import { User } from './entidades/user.entity';
import { Book } from './entidades/book.entity';
import { Genre } from './entidades/genre.entity';

// Modulos
import { BookGenre } from './entidades/book_genres.entity';
import { UsersModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BooksController } from './modules/books/book/book.controller';
import { BooksService } from './modules/books/book/book.service';
import { GenresModule } from './modules/genres/genre.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin123',
      database: 'alejandria',
      entities: [User, Book],
      synchronize: true, 
    }),
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forFeature([User, Book, Genre, BookGenre]),
    UsersModule,
    AuthModule,
    GenresModule,
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class AppModule {}