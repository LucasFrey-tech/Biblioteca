import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCartBook } from '../../entidades/shopping_cart_book.entity';
import { BookCartDTO } from './book_cart.dto';

@Injectable()
export class ShoppingCartService {
    private readonly logger = new Logger(ShoppingCartBook.name);
    constructor(
        @InjectRepository(ShoppingCartBook)
        private cartBookShopingRepository: Repository<ShoppingCartBook>,
    ) { }

    async findByUser(idUser: number): Promise<BookCartDTO[] | null> {
        const cartItems = await this.cartBookShopingRepository.find({ where: { idUser }, relations: ['user', 'book','book.author'] });
        if (!cartItems.length) {
            this.logger.log('Carrito Vacio');
            return null;
        } 

        const results = await Promise.all(
            cartItems.map(async (cart) => {
                return new BookCartDTO(
                    cart.id,
                    cart.book.id,
                    cart.book.title,
                    cart.book.author ? cart.book.author.name : '',
                    cart.book.image,
                    cart.book.price,
                    cart.virtual,
                    cart.amount,
                );
            })
        );
        this.logger.log('Carrito Obtenido');
        return results.filter((item): item is BookCartDTO => item !== null);
    }

    create(book: Partial<ShoppingCartBook>) {
        this.logger.log('Carrito Creado');
        return this.cartBookShopingRepository.save(book);
    }

    async update(idBookCart: number, updateData: Partial<ShoppingCartBook>) {
        await this.cartBookShopingRepository.update(idBookCart, updateData);
        this.logger.log('Carrito Actualizado');
        return this.cartBookShopingRepository.find({where : {id: idBookCart}});
    }

    delete(id: number) {
        this.logger.log('Carrito Borrado');
        return this.cartBookShopingRepository.delete(id);
    }
}