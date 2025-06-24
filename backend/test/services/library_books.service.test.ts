import { Test, TestingModule } from '@nestjs/testing';
import { LibraryBooksService } from '../../src/modules/books/library/library_books.service';
import { mockDtoLibraryBooksFromUser1 } from '../mocks/dtos/libraryBookDTOs.mock';
import { mockDeletedUserVirtualBooks, mockNewUserVirtualBooks, mockUserVirtualBooks, mockUserVirtualBooks1 } from '../mocks/entities/user_virtual_books.mock';
import { UserVirtualBooks } from '../../src/entidades/user_virtual_books.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('LibraryBooksService', () => {
  let service: LibraryBooksService;

  const mockUserVirtualBookRepository = {
    find: jest.fn().mockResolvedValue(mockUserVirtualBooks),
    findOne: jest.fn().mockResolvedValue(mockUserVirtualBooks1),
    create: jest.fn().mockResolvedValue(mockNewUserVirtualBooks),
    delete: jest.fn().mockResolvedValue(mockDeletedUserVirtualBooks),
    save: jest.fn().mockResolvedValue(mockNewUserVirtualBooks),    
    remove: jest.fn().mockResolvedValue(mockDeletedUserVirtualBooks),    
  };

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LibraryBooksService,
        {
          provide: getRepositoryToken(UserVirtualBooks),
          useValue: mockUserVirtualBookRepository,
        },
      ],
    }).compile();

    service = module.get<LibraryBooksService>(LibraryBooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllByUser', () => {
    it('should return an array of LibraryBookDTO', async () => {
      const userId = 1 
      const result = await service.findAllByUser(userId)
      expect(result).toEqual(mockDtoLibraryBooksFromUser1)
    });
  });

  describe('findOne', () => {
    it('should return a LibraryBookDTO if found', async () => {
      const userId = 1
      const result = await service.findAllByUser(userId);
      expect(result).toEqual(mockDtoLibraryBooksFromUser1);
    });
  });
});