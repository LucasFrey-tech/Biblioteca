import { BookContentController } from "../../src/modules/books/content/book_content.controller";
import { BookContentService } from "../../src/modules/books/content/book_content.service";
import { BookContentDTO } from "../../src/modules/books/content/book_content.dto";
import { mockDtoContent1, mockDtoNewContent, mockDtoUpdatedContent1 } from "../mocks/dtos/contentDTOs.mock";
import { mockTextFile } from "../mocks/files/textFile.mock";
import { mockBookContentService } from "../mocks/services/bookContent.service.mock";

describe('BookContentController', () => {
  let controller: BookContentController;
  let service: jest.Mocked<BookContentService>;

  beforeEach(() => {
    service = mockBookContentService
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
    const result = await controller.post(dto,mockTextFile);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toBe(created);
  });

  it('should call service.update with correct params', async () => {
        const mockUpdateBookContentdto = { ...mockDtoContent1, existingImage: "" };
    const bookContentToUpdateId = 1
    service.update.mockResolvedValue({ affected: 1 } as any);
    const result = await controller.update(bookContentToUpdateId, mockUpdateBookContentdto,mockTextFile);
    expect(service.update).toHaveBeenCalledWith(bookContentToUpdateId, mockUpdateBookContentdto);
    expect(result).toEqual({ affected: 1 });
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
    await expect(controller.post(mockDtoNewContent, mockTextFile)).rejects.toThrow('Create error');
  });

  it('update should throw if service.update throws', async () => {
    const contentToUpdateid = 1
    service.update.mockRejectedValue(new Error('Update error'));
    await expect(controller.update(contentToUpdateid, mockDtoUpdatedContent1,mockTextFile)).rejects.toThrow('Update error');
  });

  it('delete should throw if service.delete throws', () => {
    service.delete.mockImplementation(() => { throw new Error('Delete error'); });
    expect(() => controller.delete(1)).toThrow('Delete error');
  });
});