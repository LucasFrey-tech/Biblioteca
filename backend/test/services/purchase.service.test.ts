import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from '../../src/entidades/purchase.entity';
import { ShoppingCartBook } from '../../src/entidades/shopping_cart_book.entity';
import { Book } from '../../src/entidades/book.entity';
import { User } from '../../src/entidades/user.entity';
import { PurchasesService } from '../../src/modules/purchase/purchase.service';
import { Test, TestingModule } from '@nestjs/testing';
import { mockPurchasesRepository } from '../mocks/repositories/purchases.respository.mock';
import { mockShoppingCartBookRepository } from '../mocks/repositories/shopping_cart_book.repository.mock';
import { mockBooksRepository } from '../mocks/repositories/books.repository.mock';
import { mockUsersRepository } from '../mocks/repositories/users.repository.mock';
import { Subscription } from '../../src/entidades/subscription.entity';
import { mockSubscriptionRepository } from '../mocks/repositories/subscription.repository.mock';
import { UserSubscriptionDiscount } from '../../src/entidades/user_subscription_discount.entity';
import { mockUserSubscriptionDiscountRepository } from '../mocks/repositories/user_subscription_discount.repository.mock';

describe('PurchasesService', () => {
  let service: PurchasesService;
  let repo: Repository<Purchase>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchasesService,
        {
          provide: getRepositoryToken(Purchase),
          useValue: mockPurchasesRepository,
        },
        {
          provide: getRepositoryToken(ShoppingCartBook),
          useValue: mockShoppingCartBookRepository,
        },
        {
          provide: getRepositoryToken(Book),
          useValue: mockBooksRepository,
        },
        {
          provide: getRepositoryToken(Subscription),
          useValue: mockSubscriptionRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
        {
          provide: getRepositoryToken(UserSubscriptionDiscount),
          useValue: mockUserSubscriptionDiscountRepository,
        },
      ],
    }).compile();

    service = module.get<PurchasesService>(PurchasesService);
    repo = module.get<Repository<Purchase>>(getRepositoryToken(Purchase));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have a method getAllPurchases()', async () => {
    expect(service.getAllPurchases).toBeTruthy();
  });

  it('should have a method processPurchase()', async () => {
    expect(service.processPurchase).toBeTruthy();
  });

  it('should have a method getPurchaseHistory()', async () => {
    expect(service.getUserPurchaseHistory).toBeTruthy();
  });
});