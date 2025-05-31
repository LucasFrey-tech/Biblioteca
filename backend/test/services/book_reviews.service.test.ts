import { BookReviewsService } from '../../src/modules/books/reviews/book_reviews.service';

jest.mock('@nestjs/common');

describe('BookReviewsService', () => {
  let instance;

  beforeEach(() => {
    instance = new BookReviewsService();
  });

  it('instance should be an instanceof BookReviewsService', () => {
    expect(instance instanceof BookReviewsService).toBeTruthy();
  });
});