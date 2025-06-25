import { BookContentController } from "../../src/modules/books/content/book_content.controller";
import { BookContentService } from "../../src/modules/books/content/book_content.service";
import { BookContentDTO } from "../../src/modules/books/content/book_content.dto";

describe('BookContentController', () => {
  let controller: BookContentController;
  let service: jest.Mocked<BookContentService>;

  beforeEach(() => {
    service = {
      get: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;
    controller = new BookContentController(service);
  });

  it('instance should be an instanceof BookContentController', () => {
    expect(controller instanceof BookContentController).toBeTruthy();
  });

  it('should have a method get()', () => {
    expect(typeof controller.get).toBe('function');
  });

  it('should have a method post()', () => {
    expect(typeof controller.post).toBe('function');
  });

  it('should have a method update()', () => {
    expect(typeof controller.update).toBe('function');
  });

  it('should have a method delete()', () => {
    expect(typeof controller.delete).toBe('function');
  });

  it('should call service.get with correct id', async () => {
    const dto: BookContentDTO = { id: 1, content: 'abc' } as any;
    service.get.mockResolvedValue(dto);
    const result = await controller.get(1);
    expect(service.get).toHaveBeenCalledWith(1);
    expect(result).toBe(dto);
  });

  it('should call service.create with correct dto', async () => {
    const dto: BookContentDTO = { content: 'abc' } as any;
    const created: BookContentDTO = { id: 2, ...dto } as any;
    service.create.mockResolvedValue(created);
    const result = await controller.post(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toBe(created);
  });

  it('should call service.update with correct params', async () => {
    const dto: BookContentDTO = { content: 'updated' } as any;
    service.update.mockResolvedValue(undefined);
    const result = await controller.update(1, dto);
    expect(service.update).toHaveBeenCalledWith(1, dto);
    expect(result).toBeUndefined();
  });

  // it('should call service.delete with correct id', () => {
  //   service.delete.mockReturnValue();
  //   const result = controller.delete(1);
  //   expect(service.delete).toHaveBeenCalledWith(1);
  //   expect(result).toBeUndefined();
  // });

  it('get should throw if service.get throws', async () => {
    service.get.mockRejectedValue(new Error('Not found'));
    await expect(controller.get(999)).rejects.toThrow('Not found');
  });

  it('post should throw if service.create throws', async () => {
    service.create.mockRejectedValue(new Error('Create error'));
    await expect(controller.post({ content: '' } as any)).rejects.toThrow('Create error');
  });

  it('update should throw if service.update throws', () => {
    service.update.mockImplementation(() => { throw new Error('Update error'); });
    expect(() => controller.update(1, { content: '' } as any)).toThrow('Update error');
  });

  it('delete should throw if service.delete throws', () => {
    service.delete.mockImplementation(() => { throw new Error('Delete error'); });
    expect(() => controller.delete(1)).toThrow('Delete error');
  });
});