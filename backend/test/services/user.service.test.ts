import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../src/entidades/user.entity';
import { idMockedUpdatedUser, mockNewUser, mockUpdatedUser, mockUser1, mockUser2, mockUsers, mockUsersRepository } from '../mocks/repositories/users.repository.mock';
import { UsersService } from "../../src/modules/users/user.service";

describe('UsersService', () => {
  let service: UsersService;
  let repo: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
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
      const result = await service.findAll();
      expect(result).toEqual(mockUsers);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const userId = 1
      const result = await service.findOne(userId);
      expect(repo.findOne).toHaveBeenCalledWith({
        where: { id: userId },
        relations: ['userSubscriptions', 'userSubscriptions.subscription'],
      });
      expect(result).toEqual(mockUser1);
    });
  });

  describe('create', () => {
    it('should throw if email exists', async () => {
      await expect(service.create(mockUser1))
        .rejects.toThrow(BadRequestException);
    });

    it('should save user if email is unique', async () => {
      // Mock findOne to return null for both email and username checks
      repo.findOne.mockResolvedValueOnce(null).mockResolvedValueOnce(null);
      const result = await service.create(mockNewUser);
      expect(repo.save).toHaveBeenCalledWith(mockNewUser);
      expect(result).toEqual(mockNewUser);
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
      const result = await service.findByUser(mockUser1.username);
      expect(repo.findOne).toHaveBeenCalledWith({ where: { username: mockUser1.username } });
      expect(result).toEqual(mockUser1);
    });
  });

  describe('update', () => {
    it('should update and return the user', async () => {      
      const updatedData = {
        username: "actualizado",
        lastname: "actualizado",
      }
      repo.findOne.mockResolvedValue(mockUpdatedUser);
      const result = await service.update(idMockedUpdatedUser, updatedData);
      expect(repo.update).toHaveBeenCalledWith(idMockedUpdatedUser, updatedData);
      expect(result).toEqual(mockUpdatedUser);
    });
  });

  describe('delete', () => {
    it('should delete the user', async () => {      
      const mockDeleteResult = { raw: {}, affected: 1 };
      const idUser = 3
      const result = await service.delete(idUser);
      expect(repo.delete).toHaveBeenCalledWith(idUser);
      expect(result).toEqual(mockDeleteResult);
    });
  });
});