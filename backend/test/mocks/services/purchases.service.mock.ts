export const mockPurchasesService = {
      getAllPurchases: jest.fn().mockResolvedValue([]),
      processPurchase: jest.fn().mockResolvedValue(undefined),
      getPurchaseHistory: jest.fn().mockResolvedValue([]),
      getUserPurchaseHistory: jest.fn().mockResolvedValue([]),
      getUserPurchaseHistoryPaginated: jest.fn().mockResolvedValue([]),
      getAllPurchasesPaginated: jest.fn().mockResolvedValue([]),
    } as any;