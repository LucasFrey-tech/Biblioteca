import { LibraryBooksService } from '../../src/modules/books/library/library_books.service';

jest.mock('@nestjs/common');

describe('LibraryBooksService', () => {
  let instance;

  beforeEach(() => {
    instance = new LibraryBooksService();
  });

  it('instance should be an instanceof LibraryBooksService', () => {
    expect(instance instanceof LibraryBooksService).toBeTruthy();
  });
});