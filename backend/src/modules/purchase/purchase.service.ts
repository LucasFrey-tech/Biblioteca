import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from '../../entidades/purchase.entity';
import { UserSubscriptionDiscount } from '../../entidades/user_subscription_discount.entity';
import { ShoppingCartBook } from '../../entidades/shopping_cart_book.entity';
import { Book } from '../../entidades/book.entity';
import { User } from '../../entidades/user.entity';
import { PurchaseDTO, PurchaseItemDTO, PaginatedPurchaseDTO } from './DTO/purchase.dto';

interface PurchaseItem {
  cartItemId: number;
  amount: number;
  virtual: boolean;
  discount: number;
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
    @InjectRepository(UserSubscriptionDiscount)
    private discountRepository: Repository<UserSubscriptionDiscount>,
  ) { }

  /**
   * Obtener todas las compras
   * 
   * @returns {Promise<PurchaseDTO[]>} - Una promesa que resuelve con un arreglo de DTOs de compras.
   */
  async getAllPurchases(): Promise<PurchaseDTO[]> {
    this.logger.log('Obteniendo todas las compras del sistema (sin paginación)');

    const purchases = await this.purchaseRepository.find({
      relations: ['book', 'book.author', 'user', 'user.userSubscriptions', 'user.userSubscriptions.subscription'],
      order: { purchaseDate: 'DESC' }
    });

    if (!purchases.length) {
      this.logger.log('No se encontraron compras en el sistema');
      return [];
    }

    const groupedPurchases = await this.getGroupPurchases(purchases);

    return groupedPurchases;
  }

  /**
   * Obtener todas las compras con paginación
   * 
   * @param {number} page - Página solicitada (basada en 1)
   * @param {number} limit - Cantidad de compras por página
   * @returns {Promise<PaginatedPurchaseDTO>} - Una promesa que resuelve con un objeto que contiene la lista de compras y el total
   */
  async getAllPurchasesPaginated(page: number = 1, limit: number = 10): Promise<PaginatedPurchaseDTO> {
    this.logger.log(`Obteniendo compras paginadas (página: ${page}, límite: ${limit})`);

    const skip = (page - 1) * limit;
    const [purchases, total] = await this.purchaseRepository.findAndCount({
      relations: ['book', 'book.author', 'user', 'user.userSubscriptions', 'user.userSubscriptions.subscription'],
      order: { purchaseDate: 'DESC' },
      skip,
      take: limit
    });

    if (!purchases.length) {
      this.logger.log('No se encontraron compras en el sistema');
      return new PaginatedPurchaseDTO([], 0);
    }

    const groupedPurchases = await this.getGroupPurchases(purchases);

    return new PaginatedPurchaseDTO(groupedPurchases, total);
  }

  /**
   * Procesa una compra
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
        price: book.price * item.amount - item.discount,
        virtual: item.virtual,
        purchaseDate: new Date(),
      });
    }

    await this.purchaseRepository.save(purchases);
    await this.cartRepository.delete({ user });

    this.logger.log('Compra Procesada');
  }

  /**
   * Obtiene el historial de compras de un usuario específico
   * 
   * @param {number} idUser - ID del usuario a buscar
   * @returns {Promise<PurchaseDTO[] | null>} - Una promesa que resuelve con un arreglo de DTOs de las compras de ese usuario
   */
  async getUserPurchaseHistory(idUser: number): Promise<PurchaseDTO[] | null> {
    const user = await this.userRepository.findOne({ where: { id: idUser } });
    if (!user) {
      this.logger.log('Usuario No Encontrado');
      return null;
    }

    const purchases = await this.purchaseRepository.find({
      where: { user: { id: idUser } },
      relations: [
        'book',
        'book.author',
        'user',
        'user.userSubscriptions',
        'user.userSubscriptions.subscription',
      ],
      order: { purchaseDate: 'DESC' }
    });

    if (typeof purchases === 'undefined' || !purchases.length) {
      this.logger.log('Historial Vacío');
      return null;
    }

    const groupedPurchases = await this.getGroupPurchases(purchases);

    return groupedPurchases;
  }

  private async getGroupPurchases(purchases: Purchase[]): Promise<PurchaseDTO[]> {
    const acc: { [key: string]: PurchaseDTO } = {};

    for (const purchase of purchases) {
      const dateTime = purchase.purchaseDate.toLocaleDateString('es-AR');

      let resDiscount = 0;

      const activeSubscription = purchase.user.userSubscriptions.find(sub => sub.ongoing);

      if (activeSubscription?.subscription?.id) {
        const discount = await this.discountRepository.findOne({
          where: { subscription: { id: activeSubscription.subscription.id } },
        });

        if (discount) {
          resDiscount = discount.discount;
        }
      }

      const purchaseItem = new PurchaseItemDTO(
        purchase.book.id,
        purchase.book.title,
        purchase.book.author.name,
        purchase.book.image,
        purchase.book.price,
        purchase.virtual,
        purchase.amount,
        resDiscount
      );

      const totalItem = purchase.book.price * purchase.amount * (1 - resDiscount / 100);

      console.log(`Libro: ${purchase.book.title} | Precio unitario: ${purchase.book.price} | Cantidad: ${purchase.amount} | Descuento: ${resDiscount}% | Total item neto: ${totalItem}`);

      if (!acc[dateTime]) {
        acc[dateTime] = new PurchaseDTO(
          purchase.id,
          purchase.user.id,
          purchase.user.username,
          [
            new PurchaseItemDTO(
              purchase.book.id,
              purchase.book.title,
              purchase.book.author.name,
              purchase.book.image,
              purchase.book.price,
              purchase.virtual,
              purchase.amount,
              resDiscount,
            ),
          ],
          new Date(purchase.purchaseDate),
          totalItem, // total inicial
        );
        console.log(`Total inicial para fecha ${dateTime}: ${totalItem}`);
      } else {
        acc[dateTime].purchaseItems.push(
          new PurchaseItemDTO(
            purchase.book.id,
            purchase.book.title,
            purchase.book.author.name,
            purchase.book.image,
            purchase.book.price,
            purchase.virtual,
            purchase.amount,
            resDiscount,
          )
        );
        acc[dateTime].total += totalItem;
        console.log(`Total actualizado para fecha ${dateTime}: ${acc[dateTime].total}`);
      }
    }

    return Object.values(acc);
  }
}