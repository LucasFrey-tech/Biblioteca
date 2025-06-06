import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, } from '@nestjs/common';
import { ShoppingCartService } from './shopping_cart.service';
import { ShoppingCartBook } from 'src/entidades/shopping_cart_book.entity';
import { BookCartDTO } from './book_cart.dto';


@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) { }

  @Get(':idUser')
  async findByUser(@Param('idUser', ParseIntPipe) idUser: number): Promise<BookCartDTO[] | null> {
    return await this.shoppingCartService.findByUser(idUser);
  }

  @Post()
  create(@Body() book: Partial<ShoppingCartBook>) {
    return this.shoppingCartService.create(book);
  }

  @Put(':idUser')
  update(
    @Param('idUser', ParseIntPipe) idUser: number,
    @Body() updateData: Partial<ShoppingCartBook>,
  ) {
    return this.shoppingCartService.update(idUser, updateData);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.shoppingCartService.delete(id);
  }
}
