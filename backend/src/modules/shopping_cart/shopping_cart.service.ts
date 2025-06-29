import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCartBook } from '../../entidades/shopping_cart_book.entity';
import { BookCartDTO } from './book_cart.dto';
import { User } from '../../entidades/user.entity';
import { ShoppingCartCreateDTO } from './shopping_cart_create.dto';

@Injectable()
export class ShoppingCartService {
  private readonly logger = new Logger(ShoppingCartBook.name);

  constructor(
    @InjectRepository(ShoppingCartBook)
    private readonly cartBookShopingRepository: Repository<ShoppingCartBook>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findByUser(idUser: number): Promise<BookCartDTO[] | null> {
    const user = await this.userRepository.findOne({ where: { id: idUser } });
    if (!user) {
      this.logger.warn('Usuario no encontrado');
      return null;
    }

    const cartItems = await this.cartBookShopingRepository.find({
      where: { user: { id: idUser } },
      relations: ['user', 'book', 'book.author'],
    });

    if (!cartItems.length) {
      this.logger.log('Carrito Vacío');
      return null;
    }

    const results = cartItems.map(cart => new BookCartDTO({
      id: cart.id,
      idBook: cart.book.id,
      title: cart.book.title,
      author: cart.book.author?.name || '',
      image: cart.book.image,
      price: cart.book.price,
      virtual: cart.virtual,
      amount: cart.amount,
    }));

    this.logger.log('Carrito Obtenido');
    return results;
  }

  async create(input: ShoppingCartCreateDTO): Promise<ShoppingCartBook> {
    const user = await this.userRepository.findOne({ where: { id: input.idUser } });
    if (!user) {
      this.logger.warn(`Usuario con ID ${input.idUser} no encontrado`);
      throw new Error('Usuario no encontrado');
    }

    const cartItem = this.cartBookShopingRepository.create({
      amount: input.amount,
      virtual: input.virtual,
      user: { id: input.idUser },
      book: { id: input.idBook },
    });

    this.logger.log(`Carrito creado para user ${input.idUser} con libro ${input.idBook}`);
    return this.cartBookShopingRepository.save(cartItem);
  }

  async update(idBookCart: number, updateData: Partial<ShoppingCartBook>) {
    await this.cartBookShopingRepository.update(idBookCart, updateData);
    this.logger.log('Carrito Actualizado');
    return this.cartBookShopingRepository.find({ where: { id: idBookCart } });
  }

  delete(id: number) {
    this.logger.log('Carrito Borrado');
    return this.cartBookShopingRepository.delete(id);
  }
}
