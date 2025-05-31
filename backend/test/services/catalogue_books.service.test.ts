import { Test, TestingModule } from '@nestjs/testing';
import {mockBook1,mockBooks} from '../mocks/books.mock'
import { BooksService } from '../../src/modules/books/book/book.service';
import { CatalogueBookDTO } from '../../src/modules/books/catalogue//catalogue_book.dto';
import { CatalogueBooksService } from '../../src/modules/books/catalogue/catalogue_books.service';

describe('CatalogueBooksService', () => {
  let service: CatalogueBooksService;
  let booksService: { findAll: jest.Mock; findOne: jest.Mock };

  beforeEach(async () => {
    booksService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      // imports: [BooksService],
      providers: [
        CatalogueBooksService,
        { provide: BooksService, useValue: booksService },
      ],
    }).compile();

    service = module.get<CatalogueBooksService>(CatalogueBooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of CatalogueBookDTO', async () => {
      booksService.findAll.mockResolvedValue(mockBooks);
      const result = await service.findAll();
      expect(booksService.findAll).toHaveBeenCalled();
      expect(result).toHaveLength(3);
      expect(result[0]).toBeInstanceOf(CatalogueBookDTO);
      expect(result[0]).toMatchObject({
        id: mockBook1.id,
        title: mockBook1.title,
        author_id: mockBook1.author_id,
        description: mockBook1.description,
        isbn: mockBook1.isbn,
        image: mockBook1.image,
        stock: mockBook1.stock,
        subscriber_exclusive: mockBook1.subscriber_exclusive,
        price: mockBook1.price,
      });
    });
  });

  describe('findOne', () => {
    it('should return a CatalogueBookDTO if found', async () => {
      booksService.findOne.mockResolvedValue(mockBook1);
      const result = await service.findOne(1);
      expect(booksService.findOne).toHaveBeenCalledWith(1);
      expect(result).toBeInstanceOf(CatalogueBookDTO);
      expect(result).toMatchObject({
        id: mockBook1.id,
        title: mockBook1.title,
      });
    });

    it('should return null if not found', async () => {
      booksService.findOne.mockResolvedValue(null);
      const result = await service.findOne(999);
      expect(result).toBeNull();
    });
  });
});