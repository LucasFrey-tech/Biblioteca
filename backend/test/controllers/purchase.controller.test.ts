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

  it('getUserPurchaseHistoryPaginated()', async () => {
    const result = controller.getUserPurchaseHistoryPaginated(1,1,10);
    expect(mockPurchasesService.getUserPurchaseHistoryPaginated).toHaveBeenCalled()
    expect(controller.getUserPurchaseHistoryPaginated).toBeTruthy();
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

  it('getAllPurchasesPaginated() ', async () => {
    const result = controller.getAllPurchasesPaginated(1,10);
    expect(mockPurchasesService.getAllPurchasesPaginated).toHaveBeenCalled()
    expect(controller.getAllPurchasesPaginated).toBeTruthy()
  });

  it('processPurchase() should call service with correct arguments', async () => {
    await controller.processPurchase(mockDtoNewPurchase);
    expect(service.processPurchase).toHaveBeenCalledWith(mockDtoNewPurchase.idUser, mockDtoNewPurchase.items);
  });
});