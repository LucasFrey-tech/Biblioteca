import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Review } from '../../src/entidades/review.entity';
import { mockReview1, mockReviews, mockReviewsRepository, mockReviewsSearchByBookId, mockUpdatedReview } from '../mocks/repositories/reviews.repository.mock';
import { BookReviewsService } from '../../src/modules/books/reviews/book_reviews.service';
import { mockReviewDtosSearchByBookId } from '../mocks/dtos/reviewDTOs.mock';
import { mockUsersRepository } from '../mocks/repositories/users.repository.mock';
import { User } from '../../src/entidades/user.entity';

describe('BookReviewsService', () => {
  let service: BookReviewsService;
  let repo: jest.Mocked<Repository<Review>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [TypeOrmModule.forFeature([Review])],
      providers: [
        BookReviewsService,
        {
          provide: getRepositoryToken(Review),
          useValue: mockReviewsRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
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
      expect(repo.find).toHaveBeenCalledWith({ where: { book: { id: searchReviewBookId } }, relations: ['user'] });
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