import { BookReviewsController } from '../../src/modules/books/reviews/book_reviews.controller';
import { BookReviewsService } from '../../src/modules/books/reviews/book_reviews.service';

describe('BookReviewsController', () => {
  let controller: BookReviewsController;
  let service: jest.Mocked<BookReviewsService>;

  beforeEach(() => {
    service = {
      findAll: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockResolvedValue({} as any),
      findReviewsByBookId: jest.fn().mockResolvedValue([]),
      create: jest.fn().mockResolvedValue({} as any),
      update: jest.fn().mockResolvedValue({} as any),
      remove: jest.fn().mockResolvedValue(undefined),
    } as any;
    controller = new BookReviewsController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have a method findAll()', async () => {
    expect(typeof controller.findAll).toBe('function');
    const result = await controller.findAll();
    expect(Array.isArray(result)).toBe(true);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should have a method findOne()', async () => {
    expect(typeof controller.findOne).toBe('function');
    const result = await controller.findOne(1);
    expect(result).toBeDefined();
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should have a method findReviewsByBookId()', async () => {
    expect(typeof controller.findReviewsByBookId).toBe('function');
    const result = await controller.findReviewsByBookId(1);
    expect(Array.isArray(result)).toBe(true);
    expect(service.findReviewsByBookId).toHaveBeenCalledWith(1);
  });

  // it('should have a method create()', async () => {
  //   expect(typeof controller.create).toBe('function');
  //   const reviewData = { bookId: 1, userId: 2, rating: 5, comment: 'Great!' };
  //   const result = await controller.create(reviewData);
  //   expect(result).toBeDefined();
  //   expect(service.create).toHaveBeenCalledWith(reviewData);
  // });

  // it('should have a method update()', async () => {
  //   expect(typeof controller.update).toBe('function');
  //   const reviewData = { rating: 4, comment: 'Updated comment' };
  //   const result = await controller.update(1, reviewData);
  //   expect(result).toBeDefined();
  //   expect(service.update).toHaveBeenCalledWith(1, reviewData);
  // });

  it('should have a method remove()', async () => {
    expect(typeof controller.remove).toBe('function');
    const result = await controller.remove(1);
    expect(result).toBeUndefined();
    expect(service.remove).toHaveBeenCalledWith(1);
  })

});