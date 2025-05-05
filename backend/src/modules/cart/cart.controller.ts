import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from '../../entities/cart.entity';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Get(':id_user')
    async findByUser(@Param('id_user', ParseIntPipe) id_user: number): Promise<Cart[]> {
        return this.cartService.findByUser(id_user);
    }

    @Post()
    async addToCart(@Body() body: { id_user: number; id_book: number }): Promise<Cart> {
        return this.cartService.addToCart(body.id_user, body.id_book);
    }

    @Delete(':id_cart')
    async removeFromCart(@Param('id_cart', ParseIntPipe) id_cart: number): Promise<void> {
        await this.cartService.removeFromCart(id_cart);
    }
}