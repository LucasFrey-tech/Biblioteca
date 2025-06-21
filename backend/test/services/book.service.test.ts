import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Book } from '../../src/entidades/book.entity';
import { Genre } from '../../src/entidades/genre.entity';
import { mockBook1, mockBooks, mockDeletedBooks, mockNewBook, mockUpdateBook as mockUpdatedBook } from '../mocks/entities/books.mock';
import { BooksService } from '../../src/modules/books/book/book.service';
import { mockDtoBook1, mockDtoBooks, mockDtoBooksByAuthor, mockDtoBooksWithGenreAccion, mockDtoDeletedBooks, mockDtoNewBook, mockDtoNewBookWithUnexistingGenre, mockDtoUpdateBook, mockDtoUpdateBookId } from '../mocks/dtos/bookDTOs.mock';
import { SettingsService } from '../../src/settings.service';
import { mockGenre1, mockGenres } from '../mocks/entities/genres.mock';
import { mockAuthor1 } from '../mocks/entities/authors.mock';


describe('BooksService', () => {
  let service: BooksService;
  let repo: Repository<Book>;

const mockBooksRepository = {
  find: jest.fn().mockResolvedValue(mockBooks),
  findOne: jest.fn().mockResolvedValue(mockBook1),
  create: jest.fn().mockResolvedValue(mockNewBook),
  update: jest.fn().mockResolvedValue(mockUpdatedBook),
  delete: jest.fn().mockResolvedValue(mockDeletedBooks),
  save: jest.fn().mockResolvedValue(mockNewBook),    
  remove: jest.fn().mockResolvedValue(mockBook1),    
};

  const mockGenresRepository = {
    find: jest.fn().mockResolvedValue(mockGenres),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: mockBooksRepository,
        },
        {
          provide: getRepositoryToken(Genre),
          useValue: mockGenresRepository,
        },
        {
          provide: SettingsService,
          useValue: {
            getHostUrl: jest.fn().mockReturnValue('http://localhost:3001'),
            getBooksImagesPrefix: jest.fn().mockReturnValue('/books_images'),
          },
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    repo = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return array of books', async () => {
    const result = await service.findAll();
    expect(mockBooksRepository.find).toHaveBeenCalled()
    expect(result).toEqual(mockDtoBooks);
  });

  it('findOne should return a book', async () => {
    const result = await service.findOne(1);
    expect(mockBooksRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['genres', 'author'] });
    expect(result).toEqual(mockDtoBook1)
  });

  it('findAllWithGenre should filter by genre', async () => {
    const result = await service.findAllWithGenre(mockGenre1.id);
    expect(mockBooksRepository.find).toHaveBeenCalledWith({ relations: ['genres', 'author'] });
    expect(result).toEqual(mockDtoBooksWithGenreAccion);
  });

  it('findAllByAuthor should filter by author', async () => {
    const result = await service.findAllByAuthor(mockAuthor1.id);
    expect(mockBooksRepository.find).toHaveBeenCalledWith({ relations: ['genres', 'author'] });
    expect(result).toEqual(mockDtoBooksByAuthor);
  });

  it('create should save and return a book', async () => {
    const result = await service.create(mockDtoNewBook);
    expect(result).toEqual(mockNewBook);
  });

  it('create should throw if genres not found', async () => {
    mockGenresRepository.find.mockResolvedValueOnce([]);
    await expect(service.create(mockDtoNewBookWithUnexistingGenre)).rejects.toThrow('Algunos géneros no existen en la base de datos');
  });

  it('update should update and return a book', async () => {
    const result = await service.update(mockDtoUpdateBookId, mockDtoUpdateBook);
    expect(mockBooksRepository.findOne).toHaveBeenCalledWith({ where: { id: mockDtoUpdateBookId }, relations: ['genres'] });
    expect(mockBooksRepository.save).toHaveBeenCalled();
    expect(result).toEqual(mockUpdatedBook);
  });

  it('update should return null if book not found', async () => {
    mockBooksRepository.findOne = jest.fn().mockResolvedValue(null);
    const result = await service.update(999, mockDtoUpdateBook);
    expect(result).toBeNull();
  });

  it('delete should remove book and return true', async () => {
    mockBooksRepository.findOne = jest.fn().mockResolvedValue(mockBook1);
    const result = await service.delete(1);
    expect(mockBooksRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['genres'] });
    expect(mockBooksRepository.remove).toHaveBeenCalledWith(mockBook1);
    expect(result).toBe(true);
  });

  it('delete should return false if book not found', async () => {
    mockBooksRepository.findOne = jest.fn().mockResolvedValue(null);
    const result = await service.delete(999);
    expect(result).toBe(false);
  });

  it('bookImageUrl should return correct url', () => {
    const imageName = 'test.png';
    const url = service.bookImageUrl(imageName);
    expect(url).toBe('http://localhost:3001/books_images/test.png');
  });
});