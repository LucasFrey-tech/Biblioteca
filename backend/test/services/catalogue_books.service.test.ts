import { CatalogueBooksService } from '../../src/modules/books/catalogue/catalogue_books.service';

jest.mock('@nestjs/common');

describe('CatalogueBooksService', () => {
  let instance;

  beforeEach(() => {
    instance = new CatalogueBooksService();
  });

  it('instance should be an instanceof CatalogueBooksService', () => {
    expect(instance instanceof CatalogueBooksService).toBeTruthy();
  });
});