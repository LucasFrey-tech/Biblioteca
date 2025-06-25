import { GenresController } from '../../src/modules/genres/genre.controller';
import { GenresService } from '../../src/modules/genres/genre.service';

describe('GenresController', () => {
  let controller: GenresController;
  let service: jest.Mocked<GenresService>;

  beforeEach(() => {
    service = {
      findAll: jest.fn().mockResolvedValue([]),
      create: jest.fn().mockResolvedValue({}),
      delete: jest.fn().mockResolvedValue(undefined),
    } as any;
    controller = new GenresController(service);
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

  it('should have a method create()', async () => {
    expect(typeof controller.create).toBe('function');
    const mockGenre = { name: 'Test Genre' } as any;
    const result = await controller.create(mockGenre);
    expect(result).toBeDefined();
    expect(service.create).toHaveBeenCalledWith(mockGenre);
  });

  it('should have a method delete()', async () => {
    expect(typeof controller.delete).toBe('function');
    await expect(controller.delete(1)).resolves.toBeUndefined();
    expect(service.delete).toHaveBeenCalledWith(1);
  });

  it('findAll() should return an array of genres', async () => {
    const mockGenres: any[] = [
      { id: 1, name: 'Fiction' } as any,
      { id: 2, name: 'Non-fiction' } as any,
    ];
    service.findAll.mockResolvedValueOnce(mockGenres);
    const result = await controller.findAll();
    expect(result).toEqual(mockGenres);
  });

  it('create() should return the created genre', async () => {
    const mockGenre = { name: 'Adventure' } as any;
    const createdGenre = { id: 3, name: 'Adventure' } as any;
    service.create.mockResolvedValueOnce(createdGenre);
    const result = await controller.create(mockGenre);
    expect(result).toEqual(createdGenre);
  });

  it('delete() should call service.delete with correct id', async () => {
    await controller.delete(5);
    expect(service.delete).toHaveBeenCalledWith(5);
  });
});