import { CatalogueBooksController } from '../../src/modules/books/catalogue/catalogue_books.controller';
import { CatalogueBooksService } from '../../src/modules/books/catalogue/catalogue_books.service';
import { CatalogueBookDTO } from '../../src/modules/books/catalogue/dto/catalogue_book.dto';

describe('CatalogueBooksController', () => {
  let controller: CatalogueBooksController;
  let service: jest.Mocked<CatalogueBooksService>;

  beforeEach(() => {
    service = {
      findAll: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockResolvedValue(null),
    } as any;
    controller = new CatalogueBooksController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have a method findAll()', async () => {
    expect(typeof controller.findAll).toBe('function');
    const result = await controller.findAll();
    expect(Array.isArray(result)).toBe(true);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should have a method findOne()', async () => {
    expect(typeof controller.findOne).toBe('function');
    const result = await controller.findOne(1);
    expect(result === null || typeof result === 'object').toBe(true);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('findOne() should return null for non-existing id', async () => {
    service.findOne.mockResolvedValueOnce(null);
    const result = await controller.findOne(999);
    expect(result).toBeNull();
  });

  it('findOne() should return a CatalogueBookDTO for existing id', async () => {
    const mockBook: CatalogueBookDTO = { id: 1, title: 'Test Book' } as any;
    service.findOne.mockResolvedValueOnce(mockBook);
    const result = await controller.findOne(1);
    expect(result).toEqual(mockBook);
  });

  it('findAll() should return an array of CatalogueBookDTO', async () => {
    const mockBooks: CatalogueBookDTO[] = [
      { id: 1, title: 'Book 1' } as any,
      { id: 2, title: 'Book 2' } as any,
    ];
    service.findAll.mockResolvedValueOnce(mockBooks);
    const result = await controller.findAll();
    expect(result).toEqual(mockBooks);
  });
});