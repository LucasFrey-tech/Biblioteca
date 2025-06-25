import { LibraryBooksController } from '../../src/modules/books/library/library_books.controller';
import { LibraryBooksService } from '../../src/modules/books/library/library_books.service';
import { LibraryBookDTO } from '../../src/modules/books/library/dto/library_book.dto';
import { UserVirtualBooks } from '../../src/entidades/user_virtual_books.entity';
import { CreateUserVirtualBookDto } from '../../src/modules/books/library/dto/library_book_create.dto';

describe('LibraryBooksController', () => {
  let controller: LibraryBooksController;
  let service: jest.Mocked<LibraryBooksService>;

  beforeEach(() => {
    service = {
      findAllByUser: jest.fn().mockResolvedValue([]),
      create: jest.fn().mockResolvedValue({} as UserVirtualBooks),
    } as any;
    controller = new LibraryBooksController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have a method findAllByUser()', async () => {
    expect(typeof controller.findAllByUser).toBe('function');
    const result = await controller.findAllByUser(1);
    expect(Array.isArray(result)).toBe(true);
    expect(service.findAllByUser).toHaveBeenCalledWith(1);
  });

  it('should have a method create()', async () => {
    expect(typeof controller.create).toBe('function');
    const dto: CreateUserVirtualBookDto = { userId: 1, bookId: 2 } as any;
    const result = await controller.create(dto);
    expect(result).toBeDefined();
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('findAllByUser() should return an array of LibraryBookDTO', async () => {
    const mockBooks: LibraryBookDTO[] = [
      { id: 1, title: 'Book 1' } as any,
      { id: 2, title: 'Book 2' } as any,
    ];
    service.findAllByUser.mockResolvedValueOnce(mockBooks);
    const result = await controller.findAllByUser(5);
    expect(result).toEqual(mockBooks);
  });

  it('create() should return a UserVirtualBooks object', async () => {
    const mockUserBook: UserVirtualBooks = { id: 1, userId: 1, bookId: 2 } as any;
    service.create.mockResolvedValueOnce(mockUserBook);
    const dto: CreateUserVirtualBookDto = { userId: 1, bookId: 2 } as any;
    const result = await controller.create(dto);
    expect(result).toEqual(mockUserBook);
  });
});