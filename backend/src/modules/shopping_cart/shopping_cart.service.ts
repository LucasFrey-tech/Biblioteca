import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCartBook } from '../../entidades/shopping_cart_book.entity';
import { Author } from 'src/entidades/author.entity';
import { Book } from 'src/entidades/book.entity';
import { User } from 'src/entidades/user.entity';
import { BookCartDTO } from './book_cart.dto';

@Injectable()
export class ShoppingCartService {
    constructor(
        @InjectRepository(ShoppingCartBook)
        private cartBookShopingRepository: Repository<ShoppingCartBook>,

        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Book)
        private booksRepository: Repository<Book>,

        @InjectRepository(Author)
        private authorRepository: Repository<Author>,
    ) { }

    async findByUser(idUser: number): Promise<BookCartDTO[] | null> {
        const cartItems = await this.cartBookShopingRepository.find({ where: { idUser } });
        if (!cartItems.length) return null;

        /**
         * 1 [..] _> usuario 1 --> [book1]
         * 1 [..] _> usuario 1 --> [book2]
         * 1 [..] _> usuario 1 --> [book3]
         */

        const user = await this.userRepository.findOne({ where: { id: idUser } });
        if (!user) return null;

        const results = await Promise.all (
            cartItems.map(async (cart) => {
                const book = await this.booksRepository.findOne({ where: { id: cart.id } });
                if (!book) return null;

                const author = await this.authorRepository.findOne({ where: { id: book.author_id } });
         
                return new BookCartDTO(
                   cart.id,
                    book.title,
                    author ? author.name : '',
                    book.image,
                    book.price,
                    false,
                    cart.amount,
                );
            })
        );

        return results.filter((item): item is BookCartDTO => item !== null);
    }

    create(book: Partial<ShoppingCartBook>) {
        return this.cartBookShopingRepository.save(book);
    }

    async update(idUser: number, updateData: Partial<ShoppingCartBook>) {
        await this.cartBookShopingRepository.update(idUser, updateData);
        return this.findByUser(idUser);
    }

    delete(id: number) {
        return this.cartBookShopingRepository.delete(id);
    }
}
