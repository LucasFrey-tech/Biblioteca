import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Author } from '../../src/entidades/author.entity';
import { mockAuthor1, mockAuthors, mockAuthorsRepository } from '../mocks/repositories/authors.repository.mock';
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
          useValue: mockAuthorsRepository,
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
      const result = await service.findAll();
      expect(service.findAll).toBeTruthy()
      expect(mockAuthorsRepository.find).toHaveBeenCalled();
      expect(result).toEqual(mockAuthors);
    });
  });

  describe('findOne', () => {
    it('should return an author by id', async () => {
      const authorSearchedId = 1
      const result = await service.findOne(authorSearchedId);
      expect(mockAuthorsRepository.findOne).toHaveBeenCalledWith({ where: { id: authorSearchedId } });
      expect(result).toEqual(mockAuthor1);
    });
    
    it('should throw NotFoundException if author not found', async () => {
      const authorSearchedId = 5
      mockAuthorsRepository.findOne.mockResolvedValueOnce(undefined);
      await expect(service.findOne(authorSearchedId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove the author if found', async () => {
      const authorToDeleteId = 3
      await service.remove(authorToDeleteId);
      expect(mockAuthorsRepository.delete).toHaveBeenCalledWith(authorToDeleteId)
    });
    it('should throw NotFoundException if author not found', async () => {
      const authorToDeleteId = 4
      mockAuthorsRepository.delete.mockResolvedValueOnce({ affected: 0 });
      await expect(service.remove(authorToDeleteId)).rejects.toThrow(NotFoundException);
    });
  });
  describe('findAllPaginated', () => {
    it('should have findAllPaginated', async () => {
      await service.findAllPaginated();
      expect(mockAuthorsRepository.findAndCount).toHaveBeenCalled()
      expect(service.findAllPaginated).toBeTruthy()
    });
  });
});