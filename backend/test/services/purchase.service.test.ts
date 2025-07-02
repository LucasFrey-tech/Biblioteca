import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from '../../src/entidades/purchase.entity';
import { ShoppingCartBook } from '../../src/entidades/shopping_cart_book.entity';
import { Book } from '../../src/entidades/book.entity';
import { User } from '../../src/entidades/user.entity';
import { PurchasesService } from '../../src/modules/purchase/purchase.service';
import { Test, TestingModule } from '@nestjs/testing';
import { mockPurchases, mockPurchasesRepository } from '../mocks/repositories/purchases.respository.mock';
import { mockShoppingCartBookRepository } from '../mocks/repositories/shopping_cart_book.repository.mock';
import { mockBooksRepository } from '../mocks/repositories/books.repository.mock';
import { mockUsersRepository } from '../mocks/repositories/users.repository.mock';
import { Subscription } from '../../src/entidades/subscription.entity';
import { mockSubscriptionRepository } from '../mocks/repositories/subscription.repository.mock';
import { UserSubscriptionDiscount } from '../../src/entidades/user_subscription_discount.entity';
import { mockUserSubscriptionDiscountRepository } from '../mocks/repositories/user_subscription_discount.repository.mock';
import { mockDtoPaginatedPurchase, mockDtoPurchases } from 'test/mocks/dtos/purchaseDTOs.mock';

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

  it('getAllPurchases()', async () => {
    const res = await service.getAllPurchases();
    expect(mockPurchasesRepository.find).toHaveBeenCalled()
    expect(service.getAllPurchases).toBeTruthy();
  });

  it('processPurchase()', async () => {
    const purchaseItem = {
      cartItemId: 1,
      amount: 1,
      virtual: true,
      discount: 1
    }
    const res = await service.processPurchase(1, [purchaseItem]);
    expect(mockPurchasesRepository.save).toHaveBeenCalled()
    expect(service.processPurchase).toBeTruthy();
  });

  it('getUserPurchaseHistoryPaginated()', async () => {
    const res = service.getUserPurchaseHistoryPaginated(1, 1, 1);
    expect(mockPurchasesRepository.findAndCount).toHaveBeenCalled()
    expect(service.getUserPurchaseHistoryPaginated).toBeTruthy();
  });

  it('getGroupPurchases()', async () => {
    const mockQueryBuilder: any = {
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(mockPurchases,),
      getManyAndCount: jest.fn().mockResolvedValue([mockPurchases, mockPurchases.length]),
    };

    mockPurchasesRepository.createQueryBuilder = jest.fn(() => mockQueryBuilder);
    const res = await service.getAllPurchasesPaginated(1, 10);
    expect(mockPurchasesRepository.createQueryBuilder).toHaveBeenCalled()
    expect(service.getAllPurchasesPaginated).toBeTruthy();
  });
});