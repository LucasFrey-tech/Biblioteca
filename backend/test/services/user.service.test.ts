import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from "src/modules/users/user.service";
import { User } from 'src/entidades/user.entity';
import { mockUser1, mockUsers } from '../mocks/user.mock';

describe('UsersService', () => {
  let service: UsersService;
  let repo: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      repo.find.mockResolvedValue(mockUsers);
      const result = await service.findAll();
      expect(repo.find).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      repo.findOne.mockResolvedValue(mockUser1);
      const result = await service.findOne(1);
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockUser1);
    });
  });

  describe('create', () => {
    it('should throw if email and username already exist', async () => {
      repo.findOne
        .mockResolvedValueOnce(mockUser1) // email exists
        .mockResolvedValueOnce(mockUser1); // username exists
      await expect(service.create({ email: mockUser1.email, username: mockUser1.username }))
        .rejects.toThrow(BadRequestException);
    });

    it('should throw if only email exists', async () => {
      repo.findOne
        .mockResolvedValueOnce(mockUser1) // email exists
        .mockResolvedValueOnce(null); // username does not exist
      await expect(service.create({ email: mockUser1.email, username: 'other' }))
        .rejects.toThrow(BadRequestException);
    });

    it('should throw if only username exists', async () => {
      repo.findOne
        .mockResolvedValueOnce(null) // email does not exist
        .mockResolvedValueOnce(mockUser1); // username exists
      await expect(service.create({ email: 'other@example.com', username: mockUser1.username }))
        .rejects.toThrow(BadRequestException);
    });

    it('should save user if email and username are unique', async () => {
      repo.findOne
        .mockResolvedValueOnce(null) // email does not exist
        .mockResolvedValueOnce(null); // username does not exist
      repo.save.mockResolvedValue(mockUser1);
      const result = await service.create({ email: mockUser1.email, username: mockUser1.username });
      expect(repo.save).toHaveBeenCalledWith({ email: mockUser1.email, username: mockUser1.username });
      expect(result).toEqual(mockUser1);
    });
  });

  describe('findByEmail', () => {
    it('should return user by email', async () => {
      repo.findOne.mockResolvedValue(mockUser1);
      const result = await service.findByEmail(mockUser1.email);
      expect(repo.findOne).toHaveBeenCalledWith({ where: { email: mockUser1.email } });
      expect(result).toEqual(mockUser1);
    });
  });

  describe('findByUser', () => {
    it('should return user by username', async () => {
      repo.findOne.mockResolvedValue(mockUser1);
      const result = await service.findByUser(mockUser1.username);
      expect(repo.findOne).toHaveBeenCalledWith({ where: { username: mockUser1.username } });
      expect(result).toEqual(mockUser1);
    });
  });

  describe('update', () => {
    it('should update and return the user', async () => {
      repo.update.mockResolvedValue({ affected: 1, raw: {} } as any);
      jest.spyOn(service, 'findOne').mockResolvedValue(mockUser1);
      const result = await service.update(1, { email: 'new@example.com' });
      expect(repo.update).toHaveBeenCalledWith(1, { email: 'new@example.com' });
      expect(result).toEqual(mockUser1);
    });
  });

  describe('delete', () => {
    it('should delete the user', async () => {
      repo.delete.mockResolvedValue({ raw: {}, affected: 1 });
      const result = await service.delete(1);
      expect(repo.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ affected: 1 });
    });
  });
});