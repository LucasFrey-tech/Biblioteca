import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, } from '@nestjs/common';
import { ShoppingCartService } from './shopping_cart.service';
import { ShoppingCart } from 'src/entidades/shopping_cart.entity';
import { CartDTO } from './shopping_cart.dto';


@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) { }

  @Get(':idUser')
  findByUser(@Param('idUser', ParseIntPipe) idUser: number) {
    return this.shoppingCartService.findByUser(idUser);
  }

  @Post()
  create(@Body() book: Partial<ShoppingCart>) {
    return this.shoppingCartService.create(book);
  }

  @Put(':idUser')
  update(
    @Param('idUser', ParseIntPipe) idUser: number,
    @Body() updateData: Partial<ShoppingCart>,
  ) {
    return this.shoppingCartService.update(idUser, updateData);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.shoppingCartService.delete(id);
  }
}
