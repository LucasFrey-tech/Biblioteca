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
import { mockBook1, mockBooksRepository } from '../mocks/repositories/books.repository.mock';
import { mockUser1, mockUsersRepository } from '../mocks/repositories/users.repository.mock';
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

  it('getAllPurchases()', async () => {
    const res = await service.getAllPurchases();
    expect(mockPurchasesRepository.find).toHaveBeenCalled()
    expect(service.getAllPurchases).toBeTruthy();
  });

  it('getAllPurchases() throws (No se encontraron compras en el sistema)', async () => {
    mockPurchasesRepository.find = jest.fn().mockReturnThis()
    const res = await service.getAllPurchases();
    expect(mockPurchasesRepository.find).toHaveBeenCalled()
    expect(service.getAllPurchases).toBeTruthy();
    expect(res).toEqual([]);
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
  it('processPurchase() should throw if empty carrito', async () => {
    const purchaseItem = {
      cartItemId: 1,
      amount: 1,
      virtual: true,
      discount: 1
    }
    await expect(service.processPurchase(1, [])).rejects.toThrow('El carrito está vacío');
    expect(service.processPurchase).toBeTruthy();
  });
  it('processPurchase() should throw if user not found', async () => {
    mockUsersRepository.findOne = jest.fn().mockResolvedValue(null) 
    const purchaseItem = {
      cartItemId: 1,
      amount: 1,
      virtual: true,
      discount: 1
    }
    await expect(service.processPurchase(1, [purchaseItem])).rejects.toThrow('Usuario no encontrado');
    expect(service.processPurchase).toBeTruthy();
  });
  
  it('processPurchase() should throw if stock insuficiente', async () => {
    mockUsersRepository.findOne = jest.fn().mockResolvedValue(mockUser1) 
    mockBook1.stock = 0;
    
    const purchaseItem = {
      cartItemId: 1,
      amount: 1,
      virtual: false,
      discount: 1
    }
    await expect(service.processPurchase(1, [purchaseItem])).rejects.toThrow(`Stock insuficiente para el libro: ${mockBook1.title}`);
    expect(service.processPurchase).toBeTruthy();
  });
  
  it('processPurchase() if not virtual', async () => {
    mockBook1.stock = 10;
    const mockShoppingCart:ShoppingCartBook = {
        id: 1,
        amount: 0,
        virtual: false,
        user: mockUser1,
        book: mockBook1
    };
    mockUsersRepository.findOne = jest.fn().mockResolvedValue(mockUser1),
    mockShoppingCartBookRepository.findOne = jest.fn().mockResolvedValue(mockShoppingCart)
    const purchaseItem = {
      cartItemId: 1,
      amount: 1,
      virtual: false,
      discount: 1
    }
    const res = service.processPurchase(1, [purchaseItem]);
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
      andWhere: jest.fn().mockReturnThis(),
    };

    mockPurchasesRepository.createQueryBuilder = jest.fn(() => mockQueryBuilder);
    const res = await service.getAllPurchasesPaginated(2, 20,"test");
    expect(mockPurchasesRepository.createQueryBuilder).toHaveBeenCalled()
    expect(service.getAllPurchasesPaginated).toBeTruthy();
  });
});