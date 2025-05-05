import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../../entities/cart.entity';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,
    ) { }

    async findByUser(id_user: number): Promise<Cart[]> {
        return this.cartRepository.find({
            where: { user: { id_user } },
            relations: ['book'],
        });
    }

    async addToCart(id_user: number, id_book: number): Promise<Cart> {
        const cartItem = this.cartRepository.create({
            user: { id_user },
            book: { id_book },
        });
        return this.cartRepository.save(cartItem);
    }

    async removeFromCart(id_cart: number): Promise<void> {
        await this.cartRepository.delete(id_cart);
    }
}