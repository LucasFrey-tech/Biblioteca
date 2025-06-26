import { ShoppingCartController } from '../../src/modules/shopping_cart/shopping_cart.controller';
import { ShoppingCartService } from '../../src/modules/shopping_cart/shopping_cart.service';
import { ShoppingCartBook } from '../../src/entidades/shopping_cart_book.entity';
import { ShoppingCartCreateDTO } from '../../src/modules/shopping_cart/shopping_cart_create.dto';

describe('ShoppingCartController', () => {
  let controller: ShoppingCartController;
  let service: jest.Mocked<ShoppingCartService>;

  beforeEach(() => {
    service = {
      findByUser: jest.fn().mockResolvedValue([]),
      create: jest.fn().mockResolvedValue({} as ShoppingCartBook),
      update: jest.fn().mockResolvedValue({} as ShoppingCartBook),
      delete: jest.fn().mockResolvedValue({ affected: 1 }),
    } as any;
    controller = new ShoppingCartController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have a method findByUser()', async () => {
    expect(typeof controller.findByUser).toBe('function');
    const result = await controller.findByUser(1);
    expect(Array.isArray(result)).toBe(true);
    expect(service.findByUser).toHaveBeenCalledWith(1);
  });

  it('should have a method create()', async () => {
    expect(typeof controller.create).toBe('function');
    const dto: ShoppingCartCreateDTO = { userId: 1, bookId: 2, amount: 1 } as any;
    const result = await controller.create(dto);
    expect(result).toBeDefined();
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should have a method update()', async () => {
    expect(typeof controller.update).toBe('function');
    const updateData: Partial<ShoppingCartBook> = { amount: 3 };
    const result = await controller.update(1, updateData);
    expect(result).toBeDefined();
    expect(service.update).toHaveBeenCalledWith(1, updateData);
  });

  it('should have a method delete()', async () => {
    expect(typeof controller.delete).toBe('function');
    const result = await controller.delete(1);
    expect(result).toEqual({ affected: 1 });
    expect(service.delete).toHaveBeenCalledWith(1);
  });

  it('findByUser() should return null if service returns null', async () => {
    service.findByUser.mockResolvedValueOnce(null);
    const result = await controller.findByUser(999);
    expect(result).toBeNull();
  });

  it('create() should return the created ShoppingCartBook', async () => {
    const mockBook: ShoppingCartBook = { id: 1, userId: 1, bookId: 2, amount: 1 } as any;
    service.create.mockResolvedValueOnce(mockBook);
    const dto: ShoppingCartCreateDTO = { userId: 1, bookId: 2, amount: 1 } as any;
    const result = await controller.create(dto);
    expect(result).toEqual(mockBook);
  });

  // it('update() should return the updated ShoppingCartBook', async () => {
  //   const updated: ShoppingCartBook = { id: 1, userId: 1, bookId: 2, amount: 5 } as any;
  //   service.update.mockResolvedValueOnce(updated);
  //   const updateData: Partial<ShoppingCartBook> = { amount: 5 };
  //   const result = await controller.update(1, updateData);
  //   expect(result).toEqual(updated);
  // });

  // it('delete() should return the result of service.delete', async () => {
  //   service.delete.mockResolvedValueOnce({ affected: 1 });
  //   const result = await controller.delete(2);
  //   expect(result).toEqual({ affected: 1 });
  // });
});