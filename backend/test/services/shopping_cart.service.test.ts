import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import {mockShoppingCart1, mockShoppingCarts} from '../mocks/entities/shopping_cart_book.mock';
import { ShoppingCartBook } from '../../src/entidades/shopping_cart_book.entity';
import { ShoppingCartService } from '../../src/modules/shopping_cart/shopping_cart.service';

describe('ShoppingCartService', () => {
  let service: ShoppingCartService;
  let repo: jest.Mocked<Repository<ShoppingCartBook>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShoppingCartService,
        {
          provide: getRepositoryToken(ShoppingCartBook),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
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
    it('should return a cart book by user id', async () => {
      repo.findOne.mockResolvedValue(mockShoppingCart1);
      const result = await service.findByUser(1);
      expect(repo.findOne).toHaveBeenCalledWith({ where: { idUser: 1 } });
      expect(result).toEqual(mockShoppingCart1);
    });
  });

  describe('create', () => {
    it('should save and return a cart book', async () => {
      repo.save.mockResolvedValueOnce(mockShoppingCart1);
      const mockTestShoppingCart = { idUser: 1, idBook: 1, amount: 1 };
      const result = await service.create(mockTestShoppingCart);
      expect(repo.save).toHaveBeenCalledWith(mockTestShoppingCart);
      expect(result).toEqual(mockShoppingCart1);
    });
  });

  describe('update', () => {
    it('should update and return the cart book', async () => {
      repo.update.mockResolvedValue({ affected: 1, raw: {} } as any);
      jest.spyOn(service, 'findByUser').mockResolvedValue(mockShoppingCart1 as any);
      const result = await service.update(1, { amount: 2 });
      expect(repo.update).toHaveBeenCalledWith(1, { amount: 2 });
      expect(result).toEqual(mockShoppingCart1);
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