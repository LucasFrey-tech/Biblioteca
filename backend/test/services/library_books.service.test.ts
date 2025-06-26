import { Test, TestingModule } from '@nestjs/testing';
import { LibraryBooksService } from '../../src/modules/books/library/library_books.service';
import { mockDtoLibraryBooksFromUser1 } from '../mocks/dtos/libraryBookDTOs.mock';
import { mockDeletedUserVirtualBooks, mockNewUserVirtualBooks, mockUserVirtualBooks, mockUserVirtualBooks1 } from '../mocks/entities/user_virtual_books.mock';
import { UserVirtualBooks } from '../../src/entidades/user_virtual_books.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockNewUser, mockUpdatedUser, mockUser1, mockUsers } from '../mocks/entities/user.mock';
import { mockBook1, mockBooks, mockDeletedBooks, mockNewBook, mockUpdateBook } from '../mocks/entities/books.mock';
import { User } from '../../src/entidades/user.entity';
import { Book } from '../../src/entidades/book.entity';

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

  const mockUsersRepository = {
    find: jest.fn().mockResolvedValue(mockUsers),
    findOne: jest.fn().mockResolvedValue(mockUser1),
    create: jest.fn().mockResolvedValue(mockNewUser),
    update: jest.fn().mockResolvedValue(mockUpdatedUser), 
    save: jest.fn().mockResolvedValue(mockNewUser),
    delete: jest.fn().mockResolvedValue({raw: {}, affected: 1 }) ,
  }

  const mockBooksRepository = {
    find: jest.fn().mockResolvedValue(mockBooks),
    findOne: jest.fn().mockResolvedValue(mockBook1),
    create: jest.fn().mockResolvedValue(mockNewBook),
    update: jest.fn().mockResolvedValue(mockUpdateBook),
    delete: jest.fn().mockResolvedValue(mockDeletedBooks),
    save: jest.fn().mockResolvedValue(mockNewBook),    
    remove: jest.fn().mockResolvedValue(mockBook1),    
  };

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LibraryBooksService,
        {
          provide: getRepositoryToken(UserVirtualBooks),
          useValue: mockUserVirtualBookRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
        {
          provide: getRepositoryToken(Book),
          useValue: mockBooksRepository,
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