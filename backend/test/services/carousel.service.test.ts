import { Repository } from "typeorm";
import { CarouselService } from "../../src/modules/recomendations/carousel/carousel.service";
import { Carousel } from "../../src/entidades/carousel.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { mockCarouselItemRepository } from "../mocks/repositories/carousel.repository.mock";
import { getRepositoryToken } from "@nestjs/typeorm";
import { SettingsService } from "../../src/settings/settings.service";
import { mockSettingsService } from "../mocks/services/settings.service.mock";

describe('CarouselService', () => {
  let service: CarouselService;
  let repo: Repository<Carousel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarouselService,
        {
          provide: getRepositoryToken(Carousel),
          useValue: mockCarouselItemRepository,
        },
        {
          provide: SettingsService,
          useValue: mockSettingsService,
        },
      ],
    }).compile();

    service = module.get<CarouselService>(CarouselService);
    repo = module.get<Repository<Carousel>>(getRepositoryToken(Carousel));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll()', async () => {
    const result = service.findAll()
    expect(mockCarouselItemRepository.find).toHaveBeenCalled()
    expect(service.findAll).toBeTruthy();
  });

  it('findOne()', async () => {
    const result = service.findOne(1)
    expect(mockCarouselItemRepository.findOne).toHaveBeenCalled()
    expect(service.findOne).toBeTruthy();
  });
  
  it('create()', async () => {
    const result = service.create({});
    expect(mockCarouselItemRepository.create).toHaveBeenCalled()
    expect(service.create).toBeTruthy();
  });
  
  it('update()', async () => {
    const result = service.update(1,{
      idBook: 1
    });
    expect(mockCarouselItemRepository.save).toHaveBeenCalled()
    expect(service.update).toBeTruthy();
  });
  
  it('remove()', async () => {
    const result = service.remove(1);
    expect(mockCarouselItemRepository.delete).toHaveBeenCalled()
    expect(service.remove).toBeTruthy();
  });
  it('bookImageUrl()', async () => {
    const result = service.bookImageUrl("");
    expect(mockSettingsService.getHostUrl).toHaveBeenCalled()
    expect(mockSettingsService.getBooksImagesPrefix).toHaveBeenCalled()
    expect(service.bookImageUrl).toBeTruthy();
  });
});