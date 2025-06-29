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
    private readonly purchaseRepository: Repository<Purchase>,
    @InjectRepository(ShoppingCartBook)
    private readonly cartRepository: Repository<ShoppingCartBook>,
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserSubscriptionDiscount)
    private readonly discountRepository: Repository<UserSubscriptionDiscount>,
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
  async getAllPurchasesPaginated(page: number = 1, limit: number = 10, search: string = ''): Promise<PaginatedPurchaseDTO> {
    this.logger.log(`Obteniendo compras paginadas (página: ${page}, límite: ${limit}, búsqueda: ${search})`);

    const skip = (page - 1) * limit;
    const query = this.purchaseRepository.createQueryBuilder('purchase')
      .leftJoinAndSelect('purchase.book', 'book')
      .leftJoinAndSelect('book.author', 'author')
      .leftJoinAndSelect('purchase.user', 'user')
      .leftJoinAndSelect('user.userSubscriptions', 'userSubscriptions')
      .leftJoinAndSelect('userSubscriptions.subscription', 'subscription')
      .where('purchase.purchaseDate IS NOT NULL')
      .orderBy('purchase.purchaseDate', 'DESC')
      .skip(skip)
      .take(limit);

    if (search) {
      query.andWhere('user.username ILIKE :search', { search: `%${search}%` });
    }

    const [purchases, total] = await query.getManyAndCount();
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

    if (!purchases?.length) {
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


      const totalItem = purchase.book.price * purchase.amount * (1 - resDiscount / 100);

      console.log(`Libro: ${purchase.book.title} | Precio unitario: ${purchase.book.price} | Cantidad: ${purchase.amount} | Descuento: ${resDiscount}% | Total item neto: ${totalItem}`);

      if (!acc[dateTime]) {
        acc[dateTime] = new PurchaseDTO(
          purchase.id,
          purchase.user.id,
          purchase.user.username,
          [
            new PurchaseItemDTO(
              {
                id_book: purchase.book.id,
                title: purchase.book.title,
                author: purchase.book.author.name,
                image: purchase.book.image,
                price: purchase.book.price,
                virtual: purchase.virtual,
                amount: purchase.amount,
                subscriptionDiscount: resDiscount,
              },
            ),
          ],
          new Date(purchase.purchaseDate),
          totalItem, // total inicial
        );
        console.log(`Total inicial para fecha ${dateTime}: ${totalItem}`);
      } else {
        acc[dateTime].purchaseItems.push(
          new PurchaseItemDTO({
            id_book: purchase.book.id,
            title: purchase.book.title,
            author: purchase.book.author.name,
            image: purchase.book.image,
            price: purchase.book.price,
            virtual: purchase.virtual,
            amount: purchase.amount,
            subscriptionDiscount: resDiscount,
          })
        );
        acc[dateTime].total += totalItem;
        console.log(`Total actualizado para fecha ${dateTime}: ${acc[dateTime].total}`);
      }
    }

    return Object.values(acc);
  }
}