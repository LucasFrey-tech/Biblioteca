import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Review } from '../../src/entidades/review.entity';
import { mockReview1, mockReviews } from '../mocks/entities/review.mock';
import { BookReviewsService } from '../../src/modules/books/reviews/book_reviews.service';
import { User } from "src/entidades/user.entity";

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
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          },
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
      repo.find.mockResolvedValue(mockReviews);
      const result = await service.findAll();
      expect(repo.find).toHaveBeenCalledWith({});
      expect(result).toEqual(mockReviews);
    });
  });

  describe('findOne', () => {
    it('should return a review by id', async () => {
      repo.findOne.mockResolvedValue(mockReview1);
      const result = await service.findOne(1);
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockReview1);
    });

    it('should throw NotFoundException if review not found', async () => {
      repo.findOne.mockResolvedValue(null);
      await expect(service.findOne(2)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findReviewsByBookId', () => {
    it('should return reviews by book id', async () => {
      repo.find.mockResolvedValue(mockReviews);
      const result = await service.findReviewsByBookId(2);
      expect(repo.find).toHaveBeenCalledWith({ where: { idBook: 2 } });
      expect(result).toEqual(mockReviews);
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