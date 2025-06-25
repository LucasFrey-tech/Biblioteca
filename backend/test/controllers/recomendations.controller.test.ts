import { RecomendationsController } from '../../src/modules/recomendations/book_recomendations/recomendations.controller';
import { RecomendationsService } from '../../src/modules/recomendations/book_recomendations/recomendations.service';
import { RecommendationDTO } from '../../src/modules/recomendations/book_recomendations/recomendations.dto';
import { CreateRecommendationDTO } from '../../src/modules/recomendations/book_recomendations/create_recomendations.dto';

describe('RecomendationsController', () => {
  let controller: RecomendationsController;
  let service: jest.Mocked<RecomendationsService>;

  beforeEach(() => {
    service = {
      findAll: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockResolvedValue({} as RecommendationDTO),
      create: jest.fn().mockResolvedValue({} as RecommendationDTO),
      update: jest.fn().mockResolvedValue({} as RecommendationDTO),
      remove: jest.fn().mockResolvedValue(undefined),
    } as any;
    controller = new RecomendationsController(service);
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

  it('should have a method findOne()', async () => {
    expect(typeof controller.findOne).toBe('function');
    const result = await controller.findOne(1);
    expect(result).toBeDefined();
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should have a method create()', async () => {
    expect(typeof controller.create).toBe('function');
    const dto: CreateRecommendationDTO = { title: 'Test', description: 'Desc' } as any;
    const result = await controller.create(dto);
    expect(result).toBeDefined();
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should have a method update()', async () => {
    expect(typeof controller.update).toBe('function');
    const dto: CreateRecommendationDTO = { title: 'Updated', description: 'Updated Desc' } as any;
    const result = await controller.update(1, dto);
    expect(result).toBeDefined();
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('should have a method remove()', async () => {
    expect(typeof controller.remove).toBe('function');
    await expect(controller.remove(1)).resolves.toBeUndefined();
    expect(service.remove).toHaveBeenCalledWith(1);
  });

  it('findAll() should return an array of RecommendationDTO', async () => {
    const mockRecs: RecommendationDTO[] = [
      { id: 1, title: 'Rec 1', description: 'Desc 1' } as any,
      { id: 2, title: 'Rec 2', description: 'Desc 2' } as any,
    ];
    service.findAll.mockResolvedValueOnce(mockRecs);
    const result = await controller.findAll();
    expect(result).toEqual(mockRecs);
  });

  it('findOne() should return a RecommendationDTO for existing id', async () => {
    const mockRec: RecommendationDTO = { id: 1, title: 'Rec', description: 'Desc' } as any;
    service.findOne.mockResolvedValueOnce(mockRec);
    const result = await controller.findOne(1);
    expect(result).toEqual(mockRec);
  });

  it('create() should return the created RecommendationDTO', async () => {
    const dto: CreateRecommendationDTO = { title: 'New', description: 'New Desc' } as any;
    const created: RecommendationDTO = { id: 3, title: 'New', description: 'New Desc' } as any;
    service.create.mockResolvedValueOnce(created);
    const result = await controller.create(dto);
    expect(result).toEqual(created);
  });

  it('update() should return the updated RecommendationDTO', async () => {
    const dto: CreateRecommendationDTO = { title: 'Upd', description: 'Upd Desc' } as any;
    const updated: RecommendationDTO = { id: 2, title: 'Upd', description: 'Upd Desc' } as any;
    service.update.mockResolvedValueOnce(updated);
    const result = await controller.update(2, dto);
    expect(result).toEqual(updated);
  });

  it('remove() should call service.remove with correct id', async () => {
    await controller.remove(5);
    expect(service.remove).toHaveBeenCalledWith(5);
  });
});
   