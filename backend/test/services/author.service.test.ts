import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Author } from '../../src/entidades/author.entity';
import { mockAuthor1, mockAuthors } from '../mocks/authors.mock';
import { AuthorService } from '../../src/modules/authors/author.service';

describe('AuthorService', () => {
  let service: AuthorService;
  let repo: jest.Mocked<Repository<Author>>;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorService,
        {
          provide: getRepositoryToken(Author),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthorService>(AuthorService);
    repo = module.get(getRepositoryToken(Author));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all authors', async () => {
      repo.find.mockResolvedValue(mockAuthors);
      const result = await service.findAll();
      expect(repo.find).toHaveBeenCalledWith({});
      expect(result).toEqual(mockAuthors);
    });
  });

  describe('findOne', () => {
    it('should return an author by id', async () => {
      repo.findOne.mockResolvedValue(mockAuthor1);
      const result = await service.findOne(1);
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockAuthor1);
    });

    it('should throw NotFoundException if author not found', async () => {
      repo.findOne.mockResolvedValue(null);
      await expect(service.findOne(2)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove the author if found', async () => {
      repo.delete.mockResolvedValue({ raw: {}, affected: 1 });
      await expect(service.remove(1)).resolves.toBeUndefined();
      expect(repo.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if author not found', async () => {
      repo.delete.mockResolvedValue({ raw: {}, affected: 0 });
      await expect(service.remove(2)).rejects.toThrow(NotFoundException);
    });
  });
});