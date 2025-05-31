import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Book } from '../../src/entidades/book.entity';
import { BooksService } from '../../src/modules/books/book/book.service';
import { mockBook1 } from '../mocks/books.mock';

describe('BooksService', () => {
  let service: BooksService;
  let repo: Repository<Book>;

  const mockBooksRepository = {
    find: jest.fn().mockResolvedValue([mockBook1]),
    findOne: jest.fn().mockResolvedValue(mockBook1),
    save: jest.fn().mockResolvedValue(mockBook1),
    update: jest.fn().mockResolvedValue(undefined),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: mockBooksRepository,
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
    expect(repo.find).toHaveBeenCalledWith({ relations: ['genres'] });
    expect(result).toEqual([mockBook1]);
  });

  it('findOne should return a book', async () => {
    const result = await service.findOne(1);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['genres'] });
    expect(result).toEqual(mockBook1);
  });

  it('create should save and return a book', async () => {
    const result = await service.create({ title: 'Test Book' });
    expect(repo.save).toHaveBeenCalledWith({ title: 'Test Book' });
    expect(result).toEqual(mockBook1);
  });

  it('update should update and return a book', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(mockBook1 as unknown as Book);
    const result = await service.update(1, { title: 'Updated' });
    expect(repo.update).toHaveBeenCalledWith(1, { title: 'Updated' });
    expect(result).toEqual(mockBook1);
  });

  it('delete should call repository delete', async () => {
    const result = await service.delete(1);
    expect(repo.delete).toHaveBeenCalledWith(1);
    expect(result).toEqual({ affected: 1 });
  });
});