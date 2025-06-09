import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, NotFoundException, } from '@nestjs/common';
import { ShoppingCartService } from './shopping_cart.service';
import { ShoppingCartBook } from 'src/entidades/shopping_cart_book.entity';
import { BookCartDTO } from './book_cart.dto'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Changuito')
@ApiBearerAuth()
@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) { }

  @Get(':idUser')
  @ApiOperation({ summary: 'Buscar Changuito por Usuario' })
  @ApiParam({ name: 'idUser', type: Number })
  @ApiResponse({ status: 200, description: 'Changuito Encontrado' })
  async findByUser(@Param('idUser', ParseIntPipe) idUser: number): Promise<BookCartDTO[] | null> {
    return await this.shoppingCartService.findByUser(idUser);
  }

  @Post()
  @ApiOperation({ summary: 'Crear Changuito' })
  @ApiBody({ type: ShoppingCartBook })
  @ApiResponse({ status: 201, description: 'Changuito Creado' })
  create(@Body() book: Partial<ShoppingCartBook>) {
    return this.shoppingCartService.create(book);
  }

  @Put(':idUser')
  @ApiOperation({ summary: 'Actualizar Changuito' })
  @ApiParam({ name: 'idUser', type: Number })
  @ApiBody({ type: ShoppingCartBook })
  @ApiResponse({ status: 200, description: 'Changuito Actualizado', type: ShoppingCartBook })
  update(
    @Param('idUser', ParseIntPipe) idUser: number,
    @Body() updateData: Partial<ShoppingCartBook>,
  ) {
    return this.shoppingCartService.update(idUser, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar Changuito' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Changuito Eliminado' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.shoppingCartService.delete(id);
  }

  @Delete(':userId/:bookId')
  async removeItem(
    @Param('userId') userId: string,
    @Param('bookId') bookId: string
  ) {
    const success = await this.shoppingCartService.removeItem(+userId, +bookId);
    if (!success) {
      throw new NotFoundException('Item no encontrado en el carrito');
    }
    return { message: 'Item eliminado del carrito correctamente' };
  }
}
