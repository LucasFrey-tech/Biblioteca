import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Review } from '../../src/entidades/review.entity';
import { mockDeletedReviews, mockNewReview, mockReview1, mockReviews, mockReviewsSearchByBookId, mockUpdatedReview } from '../mocks/entities/review.mock';
import { BookReviewsService } from '../../src/modules/books/reviews/book_reviews.service';
import { mockReviewDtosSearchByBookId } from '../mocks/dtos/reviewDTOs.mock';

describe('BookReviewsService', () => {
  let service: BookReviewsService;
  let repo: jest.Mocked<Repository<Review>>;

  const mockReviewsRepository = {
    find: jest.fn().mockResolvedValue(mockReviews),
    findOne: jest.fn().mockResolvedValue(mockReview1),
    create: jest.fn().mockResolvedValue(mockNewReview),
    update: jest.fn().mockResolvedValue(mockUpdatedReview),
    delete: jest.fn().mockResolvedValue(mockDeletedReviews),
    save: jest.fn().mockResolvedValue(mockUpdatedReview),    
    remove: jest.fn().mockResolvedValue(mockDeletedReviews),    
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [TypeOrmModule.forFeature([Review])],
      providers: [
        BookReviewsService,
        {
          provide: getRepositoryToken(Review),
          useValue: mockReviewsRepository,
        },
      ],
    }).compile();

    service = module.get<BookReviewsService>(BookReviewsService);
    repo = module.get(getRepositoryToken(Review));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all reviews', async () => {
      const result = await service.findAll();
      expect(repo.find).toHaveBeenCalledWith({relations: ['user']});
      expect(result).toEqual(mockReviews);
    });
  });

  describe('findOne', () => {
    it('should return a review by id', async () => {
      const searchReviewId = 1
      const result = await service.findOne(searchReviewId);
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id: searchReviewId }, relations: ['user'] });
      expect(result).toEqual(mockReview1);
    });

    it('should throw NotFoundException if review not found', async () => {
      repo.findOne.mockResolvedValue(null);
      await expect(service.findOne(6)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findReviewsByBookId', () => {
    it('should return reviews by book id', async () => {
      const searchReviewBookId = 1
      repo.find = jest.fn().mockResolvedValue(mockReviewsSearchByBookId);
      const result = await service.findReviewsByBookId(searchReviewBookId);
      expect(repo.find).toHaveBeenCalledWith({ where: { id_book: searchReviewBookId }, relations: ['user'] });
      expect(result).toEqual(mockReviewDtosSearchByBookId);
    });
  });

  describe('remove', () => {
    it('should remove the review if found', async () => {
      repo.delete.mockResolvedValue({ raw: {}, affected: 1 });
      await expect(service.remove(1)).resolves.toBeUndefined();
      expect(repo.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if review not found', async () => {
      repo.delete.mockResolvedValue({ raw: {}, affected: 0 });
      await expect(service.remove(2)).rejects.toThrow(NotFoundException);
    });
  });
});