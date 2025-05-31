import { Test, TestingModule } from '@nestjs/testing';
import { LibraryBooksService } from '../../src/modules/books/library/library_books.service';
import { BooksService } from '../../src/modules/books/book/book.service';
import { LibraryBookDTO } from '../../src/modules/books/library/library_book.dto';
import {mockBook1,mockBooks} from '../mocks/books.mock'

describe('LibraryBooksService', () => {
  let service: LibraryBooksService;
  let booksService: { findAll: jest.Mock; findOne: jest.Mock };

  beforeEach(async () => {
    booksService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      // imports: [BooksService],
      providers: [
        LibraryBooksService,
        { provide: BooksService, useValue: booksService },
      ],
    }).compile();

    service = module.get<LibraryBooksService>(LibraryBooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of LibraryBookDTO', async () => {
      booksService.findAll.mockResolvedValue(mockBooks);
      const result = await service.findAll();
      expect(booksService.findAll).toHaveBeenCalled();
      expect(result).toHaveLength(3);
      expect(result[0]).toBeInstanceOf(LibraryBookDTO);
      expect(result[0]).toMatchObject({
        id: mockBook1.id,
        title: mockBook1.title,
        author_id: mockBook1.author_id,
        description: mockBook1.description,
        isbn: mockBook1.isbn,
        image: mockBook1.image,
      });
    });
  });

  describe('findOne', () => {
    it('should return a LibraryBookDTO if found', async () => {
      booksService.findOne.mockResolvedValue(mockBook1);
      const result = await service.findOne(1);
      expect(booksService.findOne).toHaveBeenCalledWith(1);
      expect(result).toBeInstanceOf(LibraryBookDTO);
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