import { Test, TestingModule } from '@nestjs/testing';
import { LibraryBooksService } from '../../src/modules/books/library/library_books.service';
import { mockDtoLibraryBooksFromUser1 } from '../mocks/dtos/libraryBookDTOs.mock';
import { UserVirtualBooks } from '../../src/entidades/user_virtual_books.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../src/entidades/user.entity';
import { Book } from '../../src/entidades/book.entity';
import { mockUserVirtualBookRepository } from '../mocks/repositories/user_virtual_books.repository.mock';
import { mockUsersRepository } from '../mocks/repositories/users.repository.mock';
import { mockBooksRepository } from '../mocks/repositories/books.repository.mock';

describe('LibraryBooksService', () => {
  let service: LibraryBooksService;

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