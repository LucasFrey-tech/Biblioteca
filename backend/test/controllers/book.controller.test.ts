import { mockBooks } from 'test/mocks/repositories/books.repository.mock';
import { BooksController } from '../../src/modules/books/book/book.controller';
import { BooksService } from '../../src/modules/books/book/book.service';
import { CreateBookDTO } from '../../src/modules/books/book/dto/createBook.dto';
import { mockBooksService } from '../mocks/services/book.service.mock';
import { mockImageFile } from 'test/mocks/files/image.mock';

describe('BooksController', () => {
  let controller: BooksController;
  let booksService: jest.Mocked<BooksService>;

  beforeEach(() => {
    booksService = mockBooksService as unknown as jest.Mocked<BooksService>;
    controller = new BooksController(booksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have a method findAll()', async () => {
    expect(typeof controller.findAll).toBe('function');
    const result = await controller.findAll();
    expect(Array.isArray(result)).toBe(true);
    expect(booksService.findAll).toHaveBeenCalled();
  });

  it('should have a method getBooksWithGenre()', async () => {
    mockBooksService.findAllWithGenres = jest.fn().mockResolvedValue([mockBooks,1])
    controller.getBooksWithGenres = jest.fn().mockResolvedValue([mockBooks,1])
    const result = await controller.getBooksWithGenres("test,test2,test3");
    expect(controller.getBooksWithGenres).toBeTruthy()
  });
  
  it('should have a method getBooksByAuthor()', async () => {
    const result = await controller.getBooksByAuthor(1);
    expect(mockBooksService.findAllByAuthor).toHaveBeenCalled()
    expect(controller.getBooksByAuthor).toBeTruthy()
  });

  it('should have a method findOne()', async () => {
    expect(typeof controller.findOne).toBe('function');
    const result = await controller.findOne(1);
    expect(result === null || typeof result === 'object').toBe(true);
    expect(booksService.findOne).toHaveBeenCalledWith(1);
  });
  
  it('should have a method create()', async () => {
    const result = controller.create(mockImageFile,{
      title: '',
      author_id: 0,
      description: '',
      anio: 0,
      isbn: '',
      image: '',
      stock: 0,
      subscriber_exclusive: false,
      price: 0,
      genre: []
    })
    expect(mockBooksService.create).toHaveBeenCalled()
    expect(controller.create).toBeTruthy()
  });
  
  it('should call create() without file', async () => {
    const mockData: CreateBookDTO = { title: 'Test', author: 1, genre: 1 } as any;
    const result = await controller.create(undefined as any, mockData);
    expect(typeof result).toBe('object');
    expect(booksService.create).toHaveBeenCalled();
  });
  
  it('should have a method update()', async () => {
    const result = controller.update(1,{
      title: '',
      author_id: 0,
      description: '',
      anio: 0,
      isbn: '',
      image: '',
      stock: 0,
      subscriber_exclusive: false,
      price: 0,
      genre: []
    },mockImageFile)
    expect(mockBooksService.update).toHaveBeenCalled()
    expect(controller.update).toBeTruthy()
  });

  it('should call update() with existingImage', async () => {
    const mockBookDTO: any = { title: 'Updated', author: 1, genre: 1, existingImage: 'existing.jpg' };
    const result = await controller.update(1, mockBookDTO, undefined as any);
    expect(typeof result).toBe('object');
    expect(booksService.update).toHaveBeenCalledWith(1, expect.any(Object));
  });

  it('should call update() with no image', async () => {
    const mockBookDTO: any = { title: 'Updated', author: 1, genre: 1 };
    const result = await controller.update(1, mockBookDTO, undefined as any);
    expect(typeof result).toBe('object');
    expect(booksService.update).toHaveBeenCalledWith(1, expect.any(Object));
  });

  it('should throw BadRequestException for invalid genre JSON in update()', async () => {
    const mockBookDTO: any = { title: 'Updated', author: 1, genre: '{invalidJson}', subscriber_exclusive: 'false' };
    await expect(controller.update(1, mockBookDTO, undefined as any)).rejects.toThrow();
  });

  it('should have a method delete()', async () => {
    expect(typeof controller.delete).toBe('function');
    const result = await controller.delete(1);
    const expectedResult = [{"anio": 1949, "author": "George Orwell", "is_active": true, "author_id": 1, "description": "1984 description.", "genre": [{"id": 1, "name": "Accion"}, {"id": 2, "name": "Aventura"}], "id": 1, "image": "http://localhost:3001/books_images/1984.png", "isbn": "9789875669284", "price": 27299, "stock": 10, "subscriber_exclusive": false, "title": "1984"}, {"anio": 1945, "author": "George Orwell", "author_id": 1, "is_active": true, "description": "Rebelion En La Granja description.", "genre": [{"id": 1, "name": "Accion"}, {"id": 3, "name": "Misterio"}], "id": 2, "image": "http://localhost:3001/books_images/rebelion_en_la_granja.png", "isbn": "9786075574028", "price": 21900, "stock": 19, "subscriber_exclusive": false, "title": "Rebelion En La Granja"}]
    expect(result).toStrictEqual(expectedResult);
    expect(booksService.delete).toHaveBeenCalledWith(1);
  });
});