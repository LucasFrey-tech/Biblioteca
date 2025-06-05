import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCart } from '../../entidades/shopping_cart.entity';
import { Author } from 'src/entidades/author.entity';
import { Book } from 'src/entidades/book.entity';
import { User } from 'src/entidades/user.entity';
import { CartDTO } from './shopping_cart.dto';
import { BookCartDTO } from './book_cart.dto';

@Injectable()
export class ShoppingCartService {
    constructor(
        @InjectRepository(ShoppingCart)
        private cartRepository: Repository<ShoppingCart>,

        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Book)
        private booksRepository: Repository<Book>,

        @InjectRepository(Author)
        private authorRepository: Repository<Author>,
    ) { }

    async findByUser(idUser: number): Promise<CartDTO | null> {
        const cart = await this.cartRepository.findOne({ where: { idUser } });
        if (!cart) return null;

        const user = await this.userRepository.findOne({ where: { id: idUser } });
        if (!user) return null;

        const book = await this.booksRepository.findOne({ where: { id: cart.idBook } });
        if (!book) return null;

        const author = await this.authorRepository.findOne({ where: { id: book.author_id } });

        const booksCarts = new BookCartDTO(
            book.id,
            book.title,
            author ? author.name : '',
            book.image,
            book.price,
            book.subscriber_exclusive,
            cart.amount,
        );

        return new CartDTO(
            cart.id,
            cart.idUser,
            user.username,
            cart.idBook,
            booksCarts,
            cart.amount,
        )
    }

    create(book: Partial<ShoppingCart>) {
        return this.cartRepository.save(book);
    }

    async update(idUser: number, updateData: Partial<ShoppingCart>) {
        await this.cartRepository.update(idUser, updateData);
        return this.findByUser(idUser);
    }

    delete(id: number) {
        return this.cartRepository.delete(id);
    }
}
