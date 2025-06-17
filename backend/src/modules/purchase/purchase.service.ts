import { Injectable } from '@nestjs/common';
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
      throw new Error('El carrito está vacío');
    }

    const user = await this.userRepository.findOne({ where: { id: idUser } });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    
    const purchases: Partial<Purchase>[] = [];
    for(const item of cartItems) {
      const cartItem = await this.cartRepository.findOne({ where: { id: item.cartItemId, idUser } });
      if (!cartItem) {
        throw new Error(`Ítem del carrito con ID ${item.cartItemId} no encontrado`);
      }
      
      const book = await this.booksRepository.findOne({ where: { id: cartItem.idBook } })
      if (!book){
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

    await this.purchaseRepository.save(purchases);
    await this.cartRepository.delete({ idUser });

  }

  async getPurchaseHistory(idUser: number): Promise<PurchaseDTO[] | null> {
    const purchases = await this.purchaseRepository.find({ where: { idUser } });
    if (!purchases.length) return null;

    const user = await this.userRepository.findOne({ where: { id: idUser } });
    if (!user) throw new Error('Usuario no encontrado');

    const results = await Promise.all(
      purchases.map(async (purchase) => {
        const book = await this.booksRepository.findOne({ where: { id: purchase.idBook } });
        if (!book) return null;

        const author = await this.authorRepository.findOne({ where: { id: book.author_id } });

        return new PurchaseDTO(
          purchase.id,
          purchase.idUser,
          purchase.idBook,
          book.title,
          author ? author.name : '',
          book.image,
          book.price,
          purchase.virtual,
          purchase.amount,
          purchase.purchaseDate,
        );
      }),
    );

    return results.filter((item): item is PurchaseDTO => item !== null);
  }
}