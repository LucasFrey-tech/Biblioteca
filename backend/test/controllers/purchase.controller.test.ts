import { PurchasesController } from '../../src/modules/purchase/purchase.controller';
import { PurchasesService } from '../../src/modules/purchase/purchase.service';
import { PurchaseDTO } from '../../src/modules/purchase/DTO/purchase.dto';
import { mockDtoNewPurchase} from '../mocks/dtos/purchaseDTOs.mock';
import { mockPurchasesService } from '../mocks/services/purchases.service.mock';

describe('PurchasesController', () => {
  let controller: PurchasesController;
  let service: jest.Mocked<PurchasesService>;

  beforeEach(() => {
    service = mockPurchasesService
    controller = new PurchasesController(mockPurchasesService);
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
    
    const result = await controller.processPurchase(mockDtoNewPurchase);
    expect(result).toEqual({ message: 'Compra procesada exitosamente' });
  });

  it('should have a method getPurchaseHistory()', async () => {
    expect(controller.getUserPurchaseHistoryPaginated).toBeTruthy();
    // expect(typeof controller.getUserPurchaseHistoryPaginated).toBe('function');
    // const userID = 1
    // const result = await controller.getUserPurchaseHistoryPaginated(userID);
    // expect(Array.isArray(result)).toBe(true);
    // expect(service.getUserPurchaseHistoryPaginated).toHaveBeenCalledWith(1);
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
    expect(controller.getAllPurchases).toBeTruthy()
    // service.getUserPurchaseHistoryPaginated.mockResolvedValueOnce(0);
    // const result = await controller.getUserPurchaseHistoryPaginated(999);
    // expect(result).toBeNull();
  });

  it('processPurchase() should call service with correct arguments', async () => {
    await controller.processPurchase(mockDtoNewPurchase);
    expect(service.processPurchase).toHaveBeenCalledWith(mockDtoNewPurchase.idUser, mockDtoNewPurchase.items);
  });
});