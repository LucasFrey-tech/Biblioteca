import { AuthorController } from "../../src/modules/authors/author.controller";
import { AuthorService } from "../../src/modules/authors/author.service";
import { Author } from "../../src/entidades/author.entity";
import { CreateAuthorDto } from "../../src/modules/authors/dto/crear-autor.dto";

describe('AuthorController', () => {
  let controller: AuthorController;
  let authorService: jest.Mocked<AuthorService>;

  beforeEach(() => {
    authorService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      remove: jest.fn(),
    } as any;
    controller = new AuthorController(authorService);
  });

  it('instance should be an instanceof AuthorController', () => {
    expect(controller instanceof AuthorController).toBeTruthy();
  });

  it('should have a method findAll()', () => {
    expect(typeof controller.findAll).toBe('function');
  });

  it('should have a method findOne()', () => {
    expect(typeof controller.findOne).toBe('function');
  });

  it('should have a method create()', () => {
    expect(typeof controller.create).toBe('function');
  });

  it('should have a method remove()', () => {
    expect(typeof controller.remove).toBe('function');
  });

  it('should call authorService.findAll and return authors', async () => {
    const authors: Author[] = [{ id: 1, name: 'Test Author' } as Author];
    authorService.findAll.mockResolvedValue(authors);
    const result = await controller.findAll();
    expect(authorService.findAll).toHaveBeenCalled();
    expect(result).toBe(authors);
  });

  it('should call authorService.findOne with correct id', async () => {
    const author: Author = { id: 1, name: 'Test Author' } as Author;
    authorService.findOne.mockResolvedValue(author);
    const result = await controller.findOne(1);
    expect(authorService.findOne).toHaveBeenCalledWith(1);
    expect(result).toBe(author);
  });

  it('should call authorService.create with correct dto', async () => {
    const dto: CreateAuthorDto = { name: 'New Author' } as CreateAuthorDto;
    const created: Author = { id: 2, ...dto } as Author;
    authorService.create.mockResolvedValue(created);
    const result = await controller.create(dto);
    expect(authorService.create).toHaveBeenCalledWith(dto);
    expect(result).toBe(created);
  });

  it('should call authorService.remove with correct id', async () => {
    authorService.remove.mockResolvedValue(undefined);
    const result = await controller.remove(1);
    expect(authorService.remove).toHaveBeenCalledWith(1);
    expect(result).toBeUndefined();
  });

  it('findOne should throw if authorService.findOne throws', async () => {
    authorService.findOne.mockRejectedValue(new Error('Not found'));
    await expect(controller.findOne(999)).rejects.toThrow('Not found');
  });

  it('create should throw if authorService.create throws', async () => {
    authorService.create.mockRejectedValue(new Error('Invalid data'));
    await expect(controller.create({ name: '' } as CreateAuthorDto)).rejects.toThrow('Invalid data');
  });

  it('remove should throw if authorService.remove throws', async () => {
    authorService.remove.mockRejectedValue(new Error('Delete error'));
    await expect(controller.remove(123)).rejects.toThrow('Delete error');
  });
});