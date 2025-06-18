import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from '../../entidades/purchase.entity';
import { ShoppingCartBook } from '../../entidades/shopping_cart_book.entity';
import { Book } from '../../entidades/book.entity';
import { User } from '../../entidades/user.entity';
import { Author } from '../../entidades/author.entity';
import { PurchaseDTO } from './DTO/purchase.dto';


interface PurchaseItem {
  cartItemId: number;
  amount: number;
  virtual: boolean;
}

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
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  async processPurchase(idUser: number, cartItems: PurchaseItem[]): Promise<void> {
    if (!cartItems.length) {
      this.logger.log('Carrito Vacio')
      throw new Error('El carrito está vacío');
    }

    const user = await this.userRepository.findOne({ where: { id: idUser } });
    if (!user) {
      this.logger.log('Usuario No Encontrado');
      throw new Error('Usuario no encontrado');
    }
    
    const purchases: Partial<Purchase>[] = [];
    for(const item of cartItems) {
      const cartItem = await this.cartRepository.findOne({ where: { id: item.cartItemId, idUser } });
      if (!cartItem) {
        this.logger.log('Item del Carrito No Encontrado');
        throw new Error(`Ítem del carrito con ID ${item.cartItemId} no encontrado`);
      }
      
      const book = await this.booksRepository.findOne({ where: { id: cartItem.idBook } })
      if (!book){
        this.logger.log('Libro No encontrado');
        throw new Error(`Libro con ID ${cartItem.idBook} no encontrado`);
      }

      purchases.push({
        idUser,
        idBook: cartItem.idBook,
        amount: item.amount,
        price: book.price * item.amount,
        virtual: item.virtual,
        purchaseDate: new Date(),
      });
      
    }

    this.logger.log('Compra Procesada');

    await this.purchaseRepository.save(purchases);
    await this.cartRepository.delete({ idUser });
  }

  async getPurchaseHistory(idUser: number): Promise<PurchaseDTO[] | null> {
    const purchases = await this.purchaseRepository.find({ where: { idUser }, relations: ['book', 'user'] });
    if (!purchases.length){
      this.logger.log('Historial Vacio');
      return null;
    } 

    const results = await Promise.all(
      purchases.map(async (purchase) => {
        return new PurchaseDTO(
          purchase.id,
          purchase.idUser,
          purchase.idBook,
          purchase.book.title,
          purchase.book.author ? purchase.book.author.name : '',
          purchase.book.image,
          purchase.book.price,
          purchase.virtual,
          purchase.amount,
          purchase.purchaseDate,
        );
      }),
    );
    this.logger.log('Historial de Compras Obtenido');
    return results.filter((item): item is PurchaseDTO => item !== null);
  }
}