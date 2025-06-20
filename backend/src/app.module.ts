import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entidades
import { User } from './entidades/user.entity';
import { Book } from './entidades/book.entity';
import { Author } from './entidades/author.entity';
import { Review } from './entidades/review.entity';
import { Genre } from './entidades/genre.entity';
//import { BookGenre } from './entidades/book_genres.entity';
import { ShoppingCartBook } from './entidades/shopping_cart_book.entity';
import { Purchase } from './entidades/purchase.entity';

// Modulos
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/user.module';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './modules/books/book/book.module';
import { AuthorModule } from './modules/authors/author.module';
import { BookReviewsModule } from './modules/books/reviews/book_reviews.module';
import { GenresModule } from './modules/genres/genre.module';
//import { BookGenresModule } from './modules/book_genre/book_genres.module';
import { ShoppingCartModule } from './modules/shopping_cart/shopping_cart.module';
import { CatalogueBooksModule } from './modules/books/catalogue/catalogue_books.module';
import { PurchasesModule } from './modules/purchase/purchase.module';
import { LibraryBooksModule } from './modules/books/library/library_books.module';
import { UserVirtualBooks } from './entidades/user_virtual_books.entity';
import { BookContentModule } from './modules/books/content/book_content.module';
import { VirtualBookContent } from './entidades/virtual_book_content.entity';

const myapp_config = require('../private/app.config.json');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: myapp_config.database_connection.host,
      port: myapp_config.database_connection.port,
      username: myapp_config.database_connection.username,
      password: myapp_config.database_connection.password,
      database: myapp_config.database_connection.database,
      entities: [User, Book, Author, Review, Genre, ShoppingCartBook, Purchase, UserVirtualBooks,VirtualBookContent],

      synchronize: false, 
    }),
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    // TypeOrmModule.forFeature([User, Book, Author, Review, Genre, BookGenre, ShoppingCartBook]),
    AuthModule,
    UsersModule,
    AuthorModule,
    BooksModule,
    BookReviewsModule,
    GenresModule,
    //BookGenresModule,
    ShoppingCartModule,
    CatalogueBooksModule,
    PurchasesModule,
    LibraryBooksModule,
    BookContentModule,
  ],
})
export class AppModule {}