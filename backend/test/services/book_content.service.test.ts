import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VirtualBookContent } from '../../src/entidades/virtual_book_content.entity';
import { BookContentService } from '../../src/modules/books/content/book_content.service';
import { Test, TestingModule } from '@nestjs/testing';
import { mockBooksRecomendationRepository } from '../mocks/repositories/books_recomendations.repository.mock';
import { Book } from '../../src/entidades/book.entity';
import { mockBooksRepository } from '../mocks/repositories/books.repository.mock';
import { mockSettingsService } from '../mocks/services/settings.service.mock';
import { SettingsService } from '../../src/settings/settings.service';

describe('BookContentService', () => {
  let service: BookContentService;
  let repo: jest.Mocked<Repository<VirtualBookContent>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
          providers: [
            BookContentService,
            {
              provide: getRepositoryToken(VirtualBookContent),
              useValue: mockBooksRecomendationRepository,
            },
            {
              provide: getRepositoryToken(Book),
              useValue: mockBooksRepository,
            },
            {
              provide: SettingsService,
              useValue: mockSettingsService,
            },
          ],
        }).compile();
    
        service = module.get<BookContentService>(BookContentService);
        repo = module.get(getRepositoryToken(VirtualBookContent));
  });

  it('instance should be an instanceof BookContentService', () => {
    expect(service instanceof BookContentService).toBeTruthy();
  });

  it('should have a method get()', async () => {
    expect(service.get).toBeTruthy();
  });

  it('should have a method create()', async () => {
    expect(service.create).toBeTruthy();
  });

  it('should have a method update()', async () => {
    expect(service.update).toBeTruthy();
  });

  it('should have a method delete()', () => {
    expect(service.delete).toBeTruthy();
  });
});