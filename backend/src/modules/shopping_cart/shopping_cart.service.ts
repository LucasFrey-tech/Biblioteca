import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {ShoppingCartBook} from '../../entidades/shopping_cart_book.entity';

@Injectable()
export class ShoppingCartService {
    constructor(
        @InjectRepository(ShoppingCartBook)
        private booksRepository: Repository<ShoppingCartBook>,
    ) {}

    findByUser(idUser: number) {
        return this.booksRepository.findOne({ where: { idUser } });
    }
    
    create(book: Partial<ShoppingCartBook>) {
        return this.booksRepository.save(book);
    }

    async update(idUser: number, updateData: Partial<ShoppingCartBook>) {
        await this.booksRepository.update(idUser, updateData);
        return this.findByUser(idUser);
    }

    delete(id: number) {
        return this.booksRepository.delete(id);
    }
}
