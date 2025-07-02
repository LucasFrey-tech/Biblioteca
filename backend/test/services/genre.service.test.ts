import { getRepositoryToken } from '@nestjs/typeorm';
import { Genre } from '../../src/entidades/genre.entity';
import { GenresService } from '../../src/modules/genres/genre.service';
import { Test, TestingModule } from '@nestjs/testing';
import { mockGenresRepository } from 'test/mocks/repositories/genres.repository.mock';

describe('GenresService', () => {
  let service: GenresService;
  
    beforeEach(async () => {
  
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          GenresService,
          {
            provide: getRepositoryToken(Genre),
            useValue: mockGenresRepository,
          },
        ],
      }).compile();
  
      service = module.get<GenresService>(GenresService);
    });

  it('instance should be an instanceof GenresService', () => {
    expect(service).toBeTruthy();
  });

  it('findAll()', async () => {
    const result = service.findAll();
    expect(mockGenresRepository.find).toHaveBeenCalled()
    expect(service.findAll).toBeTruthy();
  });
  
  it('findAllPaginated()', async () => {
    const result = service.findAllPaginated();
    expect(mockGenresRepository.findAndCount).toHaveBeenCalled()
    expect(service.findAllPaginated).toBeTruthy();
  });
  
  it('should have a method create()', async () => {
    const result = service.create({});
    expect(mockGenresRepository.create).toHaveBeenCalled()
    expect(service.create).toBeTruthy();
  });
  
  it('should have a method delete()', async () => {
    const result = service.delete(1);
    expect(mockGenresRepository.delete).toHaveBeenCalled()
    expect(service.delete).toBeTruthy();
  });
});