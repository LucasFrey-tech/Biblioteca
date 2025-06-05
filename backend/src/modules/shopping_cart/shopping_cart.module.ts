import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCart } from 'src/entidades/shopping_cart.entity';
import { ShoppingCartController } from './shopping_cart.controller';
import { ShoppingCartService } from './shopping_cart.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCart])],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
  exports: [ShoppingCartService],
})
export class ShoppingCartModule {}