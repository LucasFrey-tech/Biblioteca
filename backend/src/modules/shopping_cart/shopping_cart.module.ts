import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ShoppingCartBook} from '../../entidades/shopping_cart_book.entity'
import {ShoppingCartController} from './shopping_cart.controller';
import {ShoppingCartService} from './shopping_cart.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCartBook])],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
})
export class AppModule {}