import { CarouselController } from '../../src/modules/recomendations/carousel/carousel.controller';
import { CarouselService } from '../../src/modules/recomendations/carousel/carousel.service';
import { CarouselDTO } from '../../src/modules/recomendations/carousel/carousel.dto';
import { mockCarouselService } from '../mocks/services/carousel.service.mock';

describe('CarouselController', () => {
  let controller: CarouselController;
  let carouselService: jest.Mocked<CarouselService>;

  beforeEach(() => {
    carouselService = mockCarouselService;
    controller = new CarouselController(carouselService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have a method findAll()', async () => {
    expect(typeof controller.findAll).toBe('function');
    const result = await controller.findAll();
    expect(Array.isArray(result)).toBe(true);
    expect(carouselService.findAll).toHaveBeenCalled();
  });

  it('should have a method create()', async () => {
    expect(typeof controller.create).toBe('function');
    const mockFile = { originalname: 'test.jpg' } as Express.Multer.File;
    const mockBody: CarouselDTO = { title: 'Test', image: '' } as any;
    const result = await controller.create(mockBody, mockFile);
    expect(result).toBeDefined();
    expect(carouselService.bookImageUrl).toHaveBeenCalledWith('test.jpg');
    expect(carouselService.create).toHaveBeenCalledWith(expect.objectContaining({ image: 'http://image.url/test.jpg' }));
  });

  it('should have a method update()', async () => {
    expect(typeof controller.update).toBe('function');
    const mockUpdate: Partial<CarouselDTO> = { id:1,idBook: NaN, image: 'updated-image.jpg' };
    const result = await controller.update(1, mockUpdate);
    expect(result).toBeDefined();
    expect(carouselService.update).toHaveBeenCalledWith(1, mockUpdate);
  });

  it('should have a method remove()', async () => {
    expect(typeof controller.remove).toBe('function');
    await expect(controller.remove(1)).resolves.toBeUndefined();
    expect(carouselService.remove).toHaveBeenCalledWith(1);
  });

  it('should call create() and set image from file', async () => {
    const mockFile = { originalname: 'carousel.png' } as Express.Multer.File;
    const mockBody: CarouselDTO = { title: 'Test', image: '' } as any;
    await controller.create(mockBody, mockFile);
    expect(carouselService.bookImageUrl).toHaveBeenCalledWith('carousel.png');
    expect(carouselService.create).toHaveBeenCalled();
  });

  it('should call update() with correct parameters', async () => {
    const updateData: Partial<CarouselDTO> = { id:5,idBook: NaN,image: 'updated-image.jpg' };
    await controller.update(5, updateData);
    expect(carouselService.update).toHaveBeenCalledWith(5, updateData);
  });

  it('should call remove() with correct id', async () => {
    await controller.remove(10);
    expect(carouselService.remove).toHaveBeenCalledWith(10);
  });
});