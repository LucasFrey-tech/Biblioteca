import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VirtualBookContent } from '../../src/entidades/virtual_book_content.entity';
import { BookContentService } from '../../src/modules/books/content/book_content.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Book } from '../../src/entidades/book.entity';
import { mockBooksRepository } from '../mocks/repositories/books.repository.mock';
import { mockSettingsService } from '../mocks/services/settings.service.mock';
import { SettingsService } from '../../src/settings/settings.service';
import { mockUserVirtualBookRepository } from 'test/mocks/repositories/user_virtual_books.repository.mock';

describe('BookContentService', () => {
  let service: BookContentService;
  let repo: jest.Mocked<Repository<VirtualBookContent>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
          providers: [
            BookContentService,
            {
              provide: getRepositoryToken(VirtualBookContent),
              useValue: mockUserVirtualBookRepository,
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
    expect(service).toBeTruthy();
  });

  it('get()', async () => {
    const result = service.get(1);
    expect(mockUserVirtualBookRepository.findOne).toHaveBeenCalled()
    expect(service.get).toBeTruthy();
  });
  
  it('create()', async () => {
    const result = service.create({})
    expect(mockUserVirtualBookRepository.create).toHaveBeenCalled()
    expect(service.create).toBeTruthy();
  });
  
  it('update()', async () => {
    const result = service.update(1,{
      idBook: 1,
      content: ''
    })
    expect(mockUserVirtualBookRepository.save).toHaveBeenCalled()
    expect(service.update).toBeTruthy();
  });
  
  it('delete()', () => {
    const result = service.delete(1);
    expect(mockUserVirtualBookRepository.delete).toHaveBeenCalled()
    expect(service.delete).toBeTruthy();
  });
});