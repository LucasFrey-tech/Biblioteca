import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import {mockShoppingCart1, mockShoppingCartBookRepository, mockShoppingCartsByUser1, mockUpdatedhoppingCart} from '../mocks/repositories/shopping_cart_book.repository.mock';
import { ShoppingCartBook } from '../../src/entidades/shopping_cart_book.entity';
import { ShoppingCartService } from '../../src/modules/shopping_cart/shopping_cart.service';
import { User } from '../../src/entidades/user.entity';
import { Book } from '../../src/entidades/book.entity';
import { mockUsersRepository } from '../mocks/repositories/users.repository.mock';
import { mockDtoShoppingCartsByUser1, mockDtoUpdatedhoppingCart } from '../mocks/dtos/shopping_cart_bookDTOs.mock';
import { mockBooksRepository } from '../mocks/repositories/books.repository.mock';

describe('ShoppingCartService', () => {
  let service: ShoppingCartService;
  let repo: jest.Mocked<Repository<ShoppingCartBook>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShoppingCartService,
        {
          provide: getRepositoryToken(ShoppingCartBook),
          useValue: mockShoppingCartBookRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
        {
          provide: getRepositoryToken(Book),
          useValue: mockBooksRepository,
        },
      ],
    }).compile();

    service = module.get<ShoppingCartService>(ShoppingCartService);
    repo = module.get(getRepositoryToken(ShoppingCartBook));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findByUser', () => {
    it('should return a cart with books by user id', async () => {
      const userId = 1;
      repo.find.mockResolvedValueOnce(mockShoppingCartsByUser1 as any);
      const result = await service.findByUser(userId);
      expect(JSON.parse(JSON.stringify(result))).toEqual(JSON.parse(JSON.stringify(mockDtoShoppingCartsByUser1)));
    });
  });

  describe('create', () => {
    it('should save and return a cart book', async () => {
      repo.save.mockResolvedValueOnce(mockShoppingCart1);
      const mockTestShoppingCart = { idUser: 1, idBook: 1, amount: 1, virtual: false };
      const result = await service.create(mockTestShoppingCart);
      expect(repo.save).toHaveBeenCalled();
      expect(result).toEqual(mockShoppingCart1);
    });
  });

  describe('update', () => {
    it('should update and return the cart book', async () => {
      const shoppingCartBookId = 1;
      repo.find.mockResolvedValue([mockUpdatedhoppingCart]);
      const result = await service.update(shoppingCartBookId, mockDtoUpdatedhoppingCart);
      expect(result).toEqual([mockUpdatedhoppingCart]);
    });
  });

  describe('delete', () => {
    it('should delete the cart book by id', async () => {
      const mockTestDeleteResult = { raw: {}, affected: 1 };
      repo.delete.mockResolvedValue(mockTestDeleteResult as any);
      const result = await service.delete(1);
      expect(repo.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockTestDeleteResult);
    });
  });
});