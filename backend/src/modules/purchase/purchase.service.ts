import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from '../../entidades/purchase.entity';
import { ShoppingCartBook } from '../../entidades/shopping_cart_book.entity';
import { Book } from '../../entidades/book.entity';
import { User } from '../../entidades/user.entity';
import { PurchaseDTO } from './DTO/purchase.dto';

interface PurchaseItem {
  cartItemId: number;
  amount: number;
  virtual: boolean;
}

/**
 * Servicio que maneja la lógica de negocio para las compras.
 */
@Injectable()
export class PurchasesService {
  private readonly logger = new Logger(PurchasesService.name);

  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
    @InjectRepository(ShoppingCartBook)
    private cartRepository: Repository<ShoppingCartBook>,
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * Obtener todas las compras
   * 
   * @returns {Promise<PurchaseDTO[]>} - Una promesa que resuelve con un arrelgo de DTOs de compras.
   */
  async getAllPurchases(): Promise<PurchaseDTO[]> {
    this.logger.log('Obteniendo todas las compras del sistema');

    const purchases = await this.purchaseRepository.find({
      relations: ['book', 'book.author', 'user'],
      order: { purchaseDate: 'DESC' }
    });

    if (!purchases.length) {
      this.logger.log('No se encontraron compras en el sistema');
      return [];
    }

    return purchases.map(purchase => new PurchaseDTO(
      purchase.id,
      purchase.user.id,
      purchase.user.username,
      purchase.book.id,
      purchase.book.title,
      purchase.book.author?.name || 'Autor desconocido',
      purchase.book.image,
      purchase.price,
      purchase.virtual,
      purchase.amount,
      purchase.purchaseDate
    ));
  }

  /**
   * Obtiene
   * 
   * @param {number} idUser 
   * @param {PurchaseItem[]} cartItems 
   */
  async processPurchase(idUser: number, cartItems: PurchaseItem[]): Promise<void> {
    if (!cartItems.length) {
      this.logger.log('Carrito Vacío');
      throw new Error('El carrito está vacío');
    }

    const user = await this.userRepository.findOne({ where: { id: idUser } });
    if (!user) {
      this.logger.log('Usuario No Encontrado');
      throw new Error('Usuario no encontrado');
    }

    const purchases: Partial<Purchase>[] = [];

    for (const item of cartItems) {
      const cartItem = await this.cartRepository.findOne({
        where: { id: item.cartItemId },
        relations: ['book', 'user']
      });

      if (!cartItem || cartItem.user.id !== idUser) {
        this.logger.log('Item del Carrito No Encontrado');
        throw new Error(`Ítem del carrito con ID ${item.cartItemId} no encontrado o no pertenece al usuario`);
      }

      const book = cartItem.book;

      if (!item.virtual) {
        if (book.stock < item.amount) {
          throw new Error(`Stock insuficiente para el libro: ${book.title}`);
        }

        book.stock -= item.amount;
        await this.booksRepository.save(book);
      }

      purchases.push({
        user,
        book,
        amount: item.amount,
        price: book.price * item.amount,
        virtual: item.virtual,
        purchaseDate: new Date(),
      });
    }

    await this.purchaseRepository.save(purchases);
    await this.cartRepository.delete({ user });

    this.logger.log('Compra Procesada');
  }

  /**
   * Obtiene el historial de compras del usuario específico
   * 
   * @param {number} idUser - ID del usaurio a buscar
   * @returns {Promise<PurchaseDTO[]>} - Una promesa que resuelve con un arreglo de DTOs de las compras de ese usuario
   */
  async getPurchaseHistory(idUser: number): Promise<PurchaseDTO[] | null> {
    const user = await this.userRepository.findOne({ where: { id: idUser } });
    if (!user) {
      this.logger.log('Usuario No Encontrado');
      return null;
    }

    const purchases = await this.purchaseRepository.find({
      where: { user: {id: idUser } },
      relations: ['book', 'user', 'book.author'],
      order: { purchaseDate: 'DESC' }
    });

    if (!purchases.length) {
      this.logger.log('Historial Vacío');
      return null;
    }

    return purchases.map(purchase => new PurchaseDTO(
      purchase.id,
      purchase.user.id,
      purchase.user.username,
      purchase.book.id,
      purchase.book.title,
      purchase.book.author?.name || '',
      purchase.book.image,
      purchase.price,
      purchase.virtual,
      purchase.amount,
      purchase.purchaseDate
    ));
  }
}