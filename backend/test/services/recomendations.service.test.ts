import { getRepositoryToken, InjectRepository } from "@nestjs/typeorm";
import { BookRecommendation } from "../../src/entidades/book_recommendations.entity";
import { Repository } from "typeorm";
import { RecomendationsService } from "../../src/modules/recomendations/book_recomendations/recomendations.service";
import { mockBooksRecomendationRepository } from "../mocks/repositories/books_recomendations.repository.mock";
import { Test, TestingModule } from "@nestjs/testing";
import { Book } from "../../src/entidades/book.entity";
import { mockBooksRepository } from "../mocks/repositories/books.repository.mock";

describe('RecomendationsService', () => {
  let service: RecomendationsService;
  let repo: Repository<BookRecommendation>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecomendationsService,
        {
          provide: getRepositoryToken(BookRecommendation),
          useValue: mockBooksRecomendationRepository,
        },
        {
          provide: getRepositoryToken(Book),
          useValue: mockBooksRepository,
        }
      ],
    }).compile();

    service = module.get<RecomendationsService>(RecomendationsService);
    repo = module.get<Repository<BookRecommendation>>(getRepositoryToken(BookRecommendation));
  });

  it('should have a method findAll()', async () => {
    const result = service.findAll()
    expect(mockBooksRecomendationRepository.find).toHaveBeenCalled()
    expect(service.findAll).toBeTruthy();
  });
  
  it('should have a method findOne()', async () => {
    const result = service.findOne(1)
    expect(mockBooksRecomendationRepository.findOne).toHaveBeenCalled()
    expect(service.findOne).toBeTruthy();
  });
  
  it('should have a method create()', async () => {
    const result = service.create({
      idBook: 1
    })
    expect(mockBooksRecomendationRepository.create).toHaveBeenCalled()
    expect(service.create).toBeTruthy();
  });
  
  it('should have a method update()', async () => {
    const result = service.update(1,{
      idBook: 1
    })
    expect(mockBooksRecomendationRepository.update).toHaveBeenCalled()
    expect(service.update).toBeTruthy();
  });
  
  it('should have a method remove()', async () => {
    const result = service.remove(1)
    expect(mockBooksRecomendationRepository.delete).toHaveBeenCalled()
    expect(service.remove).toBeTruthy();
  });
});