import { CatalogueBooksController } from '../../src/modules/books/catalogue/catalogue_books.controller';
import { CatalogueBooksService } from '../../src/modules/books/catalogue/catalogue_books.service';
import { CatalogueBookDTO } from '../../src/modules/books/catalogue/dto/catalogue_book.dto';
import { PaginatedCatalogueBooksDTO } from '../../src/modules/books/catalogue/dto/cataloguePAG.dto';

describe('CatalogueBooksController', () => {
  let controller: CatalogueBooksController;
  let service: jest.Mocked<CatalogueBooksService>;

  beforeEach(() => {
    service = {
      findAll: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockResolvedValue(null),
      findAllPaginated: jest.fn().mockResolvedValue({ books: [], total: 0 }),
      searchBooks: jest.fn().mockResolvedValue({ books: [], total: 0 }),
    } as any;

    controller = new CatalogueBooksController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll() should return an array of books', async () => {
    const mockBooks: CatalogueBookDTO[] = [
      { id: 1, title: 'Book 1' } as any,
      { id: 2, title: 'Book 2' } as any,
    ];
    service.findAll.mockResolvedValueOnce(mockBooks);
    const result = await controller.findAll();
    expect(result).toEqual(mockBooks);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('findOne() should return a book if found', async () => {
    const mockBook: CatalogueBookDTO = { id: 1, title: 'Book Found' } as any;
    service.findOne.mockResolvedValueOnce(mockBook);
    const result = await controller.findOne(1);
    expect(result).toEqual(mockBook);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('findOne() should return null if book not found', async () => {
    service.findOne.mockResolvedValueOnce(null);
    const result = await controller.findOne(999);
    expect(result).toBeNull();
    expect(service.findOne).toHaveBeenCalledWith(999);
  });

  it('findAllPaginated() should return paginated books', async () => {
    const paginated: PaginatedCatalogueBooksDTO = {
      books: [{ id: 1, title: 'Paginated Book' } as any],
      total: 1,
    };
    service.findAllPaginated.mockResolvedValueOnce(paginated);
    const result = await controller.findAllPaginated(1, 10);
    expect(result).toEqual(paginated);
    expect(service.findAllPaginated).toHaveBeenCalledWith(1, 10);
  });

  it('searchBooks() should call service with parsed filters', async () => {
    const paginated: PaginatedCatalogueBooksDTO = {
      books: [{ id: 1, title: 'Search Result' } as any],
      total: 1,
    };

    service.searchBooks.mockResolvedValueOnce(paginated);

    const result = await controller.searchBooks('test', '1,2', '3', 2, 5);
    expect(result).toEqual(paginated);
    expect(service.searchBooks).toHaveBeenCalledWith(
      'test',
      [1, 2],
      [3],
      2,
      5
    );
  });

  it('searchBooks() should handle empty optional filters', async () => {
    service.searchBooks.mockResolvedValueOnce({ books: [], total: 0 });
    const result = await controller.searchBooks('title', '', '', 1, 10);
    expect(result).toEqual({ books: [], total: 0 });
    expect(service.searchBooks).toHaveBeenCalledWith('title', [], [], 1, 10);
  });
});
