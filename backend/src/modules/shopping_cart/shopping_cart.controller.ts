import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, NotFoundException, } from '@nestjs/common';
import { ShoppingCartService } from './shopping_cart.service';
import { ShoppingCartBook } from '../../../src/entidades/shopping_cart_book.entity';
import { BookCartDTO } from './book_cart.dto'
import { ShoppingCartCreateDTO } from './shopping_cart_create.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Changuito')
@ApiBearerAuth()
@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) { }

  @Get(':idUser')
  @ApiOperation({ summary: 'Buscar Changuito por Usuario' })
  @ApiParam({ name: 'idUser', type: Number })
  @ApiResponse({ status: 200, description: 'Changuito Encontrado', type: BookCartDTO })
  async findByUser(@Param('idUser', ParseIntPipe) idUser: number): Promise<BookCartDTO[] | null> {
    return await this.shoppingCartService.findByUser(idUser);
  }


  @Post()
  @ApiOperation({ summary: 'Crear Changuito' })
  @ApiBody({ type: ShoppingCartCreateDTO })
  @ApiResponse({ status: 201, description: 'Changuito Creado', type: ShoppingCartCreateDTO })
  create(@Body() bookDto: ShoppingCartCreateDTO) {
    return this.shoppingCartService.create(bookDto);
  }

  @Put(':idBookCart')
  @ApiOperation({ summary: 'Actualizar Changuito' })
  @ApiParam({ name: 'idBookCart', type: Number })
  @ApiBody({ type: ShoppingCartBook })
  @ApiResponse({ status: 200, description: 'Changuito Actualizado', type: ShoppingCartBook })
  update(
    @Param('idBookCart', ParseIntPipe) idBookCart: number,
    @Body() updateData: Partial<ShoppingCartBook>,
  ) {
    return this.shoppingCartService.update(idBookCart, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar Changuito' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Changuito Eliminado' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.shoppingCartService.delete(id);
  }
}
