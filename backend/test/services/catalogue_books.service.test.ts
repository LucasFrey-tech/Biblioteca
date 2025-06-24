import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from '../../src/modules/books/book/book.service';
import { CatalogueBooksService } from '../../src/modules/books/catalogue/catalogue_books.service';
import { mockBooksService } from '../mocks/services/book.service.mock';
import { mockDtoCatalogueBook1, mockDtoCatalogueBooks } from '../mocks/dtos/catalogueBookDTOs.mock';

describe('CatalogueBooksService', () => {
  let service: CatalogueBooksService;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatalogueBooksService,
        { 
          provide: BooksService, 
          useValue: mockBooksService 
        },
      ],
    }).compile();

    service = module.get<CatalogueBooksService>(CatalogueBooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of CatalogueBookDTO', async () => {
      const result = await service.findAll();
      expect(result).toEqual(mockDtoCatalogueBooks);
    });
  });

  describe('findOne', () => {
    it('should return a CatalogueBookDTO if found', async () => {
      const searchedCataloguedBookId = 1
      const result = await service.findOne(searchedCataloguedBookId);
      expect(result).toEqual(mockDtoCatalogueBook1)
    });

    it('should return null if not found', async () => {
      mockBooksService.findOne = jest.fn().mockResolvedValue(null);
      const result = await service.findOne(999);
      expect(result).toBeNull();
    });
  });
});