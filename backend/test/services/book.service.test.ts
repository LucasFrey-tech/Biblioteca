import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Book } from '../../src/entidades/book.entity';
import { Genre } from '../../src/entidades/genre.entity';
import { mockBook1,mockNewBook, mockUpdatedBook as mockUpdatedBook } from '../mocks/repositories/books.repository.mock';
import { BooksService } from '../../src/modules/books/book/book.service';
import { mockDtoBook1, mockDtoBooks, mockDtoBooksByAuthorIdOne, mockDtoBooksWithGenreAccion, mockDtoDeletedBooks, mockDtoNewBook, mockDtoNewBookWithUnexistingGenre, mockDtoUpdateBook, mockDtoUpdateBookId } from '../mocks/dtos/bookDTOs.mock';
import { SettingsService } from '../../src/settings/settings.service';
import { mockGenre1, mockGenresRepository } from '../mocks/repositories/genres.repository.mock';
import { mockSettingsService } from '../mocks/services/settings.service.mock'
import { mockBooksRepository } from '../mocks/repositories/books.repository.mock';
import { mockAuthor1 } from '../mocks/repositories/authors.repository.mock';


describe('BooksService', () => {
  let service: BooksService;
  let repo: Repository<Book>;
  const mockedSettingService = mockSettingsService

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
          useValue: mockedSettingService,
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
    expect(mockBooksRepository.findOne).toHaveBeenCalledWith({ where: { id: 1, is_active: true }, relations: ['genres', 'author'] });
    expect(result).toEqual(mockDtoBook1)
  });

  it('findAllWithGenre should filter by genre', async () => {
    expect(service.findAllWithGenres).toBeTruthy();
    // const result = await service.findAllWithGenre(mockGenre1.id);
    // expect(mockBooksRepository.find).toHaveBeenCalledWith({  where: {  is_active: true }, relations: ['genres', 'author'] });
    // expect(result).toEqual(mockDtoBooksWithGenreAccion);
  });
  
  it('findAllByAuthor should filter by author', async () => {
    expect(service.findAllByAuthor).toBeTruthy();
    // const result = await service.findAllByAuthor(mockAuthor1.id);
    // expect(mockBooksRepository.find).toHaveBeenCalledWith({ where: {  is_active: true },relations: ['genres', 'author'] });
    // expect(result).toEqual(mockDtoBooksByAuthorIdOne);
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
    const bookId = 1
    const result = await service.delete(bookId);
    expect(result).toBe(true);
  });
  
  it('delete should return false if book not found', async () => {
    mockBooksRepository.findOne = jest.fn().mockResolvedValue(null);
    const result = await service.delete(999);
    expect(result).toBe(false);
  });
  
  it('bookImageUrl should return correct url', async () => {
    const imageFileName = 'test.png';
    const result =  service.bookImageUrl(imageFileName);
    const expectedResult = mockedSettingService.getHostUrl()+mockedSettingService.getBooksImagesPrefix()+"/"+imageFileName
    expect(result).toEqual(expectedResult);
  });
});