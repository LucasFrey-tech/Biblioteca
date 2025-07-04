import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Entidades
import { User } from './entidades/user.entity';
import { Book } from './entidades/book.entity';
import { Author } from './entidades/author.entity';
import { Review } from './entidades/review.entity';
import { Genre } from './entidades/genre.entity';
import { ShoppingCartBook } from './entidades/shopping_cart_book.entity';
import { Purchase } from './entidades/purchase.entity';
import { UserSubscription } from './entidades/subscription_user.entity';
import { Subscription } from './entidades/subscription.entity';
import { VirtualBookContent } from './entidades/virtual_book_content.entity';
import { UserVirtualBooks } from './entidades/user_virtual_books.entity';
import { BookRecommendation } from './entidades/book_recommendations.entity';
import { Carousel } from './entidades/carousel.entity';
import { UserSubscriptionDiscount } from './entidades/user_subscription_discount.entity';

// Modulos
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/user.module';
import { BooksModule } from './modules/books/book/book.module';
import { AuthorModule } from './modules/authors/author.module';
import { BookReviewsModule } from './modules/books/reviews/book_reviews.module';
import { GenresModule } from './modules/genres/genre.module';
import { ShoppingCartModule } from './modules/shopping_cart/shopping_cart.module';
import { CatalogueBooksModule } from './modules/books/catalogue/catalogue_books.module';
import { PurchasesModule } from './modules/purchase/purchase.module';
import { LibraryBooksModule } from './modules/books/library/library_books.module';
import { BookContentModule } from './modules/books/content/book_content.module';
import { UserSubscriptionModule } from './modules/subscriptions/users_subscriptions/subscription_user.module';
import { SubscriptionModule } from './modules/subscriptions/subscription_config/subscription_config.module';
import { CarouserModule } from './modules/recomendations/carousel/carousel.module';
import { RecomendationsModule } from './modules/recomendations/book_recomendations/recomendations.module';
import { UserSubscriptionDiscountModule } from './modules/subscriptions/subscription_discount/user_subscription_discount.module';

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
      entities: [User, Book, Author, Review, Genre, ShoppingCartBook, Purchase, UserVirtualBooks,VirtualBookContent,UserSubscription,Subscription,Carousel,BookRecommendation, UserSubscriptionDiscount],

      synchronize: false, 
    }),
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    AuthModule,
    UsersModule,
    AuthorModule,
    BooksModule,
    BookReviewsModule,
    GenresModule,
    ShoppingCartModule,
    CatalogueBooksModule,
    PurchasesModule,
    LibraryBooksModule,
    BookContentModule,
    UserSubscriptionModule,
    SubscriptionModule,
    CarouserModule,
    RecomendationsModule,
    UserSubscriptionDiscountModule
  ],
})
export class AppModule {}