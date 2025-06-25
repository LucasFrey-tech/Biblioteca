import { PurchasesController } from '../../src/modules/purchase/purchase.controller';
import { PurchasesService } from '../../src/modules/purchase/purchase.service';
import { PurchaseDTO } from '../../src/modules/purchase/DTO/purchase.dto';

describe('PurchasesController', () => {
  let controller: PurchasesController;
  let service: jest.Mocked<PurchasesService>;

  beforeEach(() => {
    service = {
      getAllPurchases: jest.fn().mockResolvedValue([]),
      processPurchase: jest.fn().mockResolvedValue(undefined),
      getPurchaseHistory: jest.fn().mockResolvedValue([]),
    } as any;
    controller = new PurchasesController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have a method getAllPurchases()', async () => {
    expect(typeof controller.getAllPurchases).toBe('function');
    const result = await controller.getAllPurchases();
    expect(Array.isArray(result)).toBe(true);
    expect(service.getAllPurchases).toHaveBeenCalled();
  });

  it('should have a method processPurchase()', async () => {
    expect(typeof controller.processPurchase).toBe('function');
    const body = {
      idUser: 1,
      items: [{ cartItemId: 1, amount: 2, virtual: false }],
      price: 100,
    };
    const result = await controller.processPurchase(body);
    expect(result).toEqual({ message: 'Compra procesada exitosamente' });
    expect(service.processPurchase).toHaveBeenCalledWith(1, body.items);
  });

  it('should have a method getPurchaseHistory()', async () => {
    expect(typeof controller.getPurchaseHistory).toBe('function');
    const result = await controller.getPurchaseHistory(1);
    expect(Array.isArray(result)).toBe(true);
    expect(service.getPurchaseHistory).toHaveBeenCalledWith(1);
  });

  it('getAllPurchases() should return an array of PurchaseDTO', async () => {
    const mockPurchases: PurchaseDTO[] = [
      { id: 1, userId: 1, total: 100 } as any,
      { id: 2, userId: 2, total: 200 } as any,
    ];
    service.getAllPurchases.mockResolvedValueOnce(mockPurchases);
    const result = await controller.getAllPurchases();
    expect(result).toEqual(mockPurchases);
  });

  it('getPurchaseHistory() should return null if service returns null', async () => {
    service.getPurchaseHistory.mockResolvedValueOnce(null);
    const result = await controller.getPurchaseHistory(999);
    expect(result).toBeNull();
  });

  it('processPurchase() should call service with correct arguments', async () => {
    const body = {
      idUser: 5,
      items: [{ cartItemId: 10, amount: 1, virtual: true }],
      price: 50,
    };
    await controller.processPurchase(body);
    expect(service.processPurchase).toHaveBeenCalledWith(5, body.items);
  });
});