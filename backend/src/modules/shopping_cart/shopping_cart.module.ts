import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCartController } from './shopping_cart.controller';
import { ShoppingCartService } from './shopping_cart.service';
import { ShoppingCartBook } from 'src/entidades/shopping_cart_book.entity';
import { Book } from 'src/entidades/book.entity';
import { User } from 'src/entidades/user.entity';
import { Author } from 'src/entidades/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCartBook, Book, User, Author])],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
  exports: [ShoppingCartService],
})
export class ShoppingCartModule {}