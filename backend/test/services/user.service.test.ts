import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../src/entidades/user.entity';
import { mockUser1, mockUser2, mockUsers } from '../mocks/entities/user.mock';
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
      expect(result).toEqual({ 
        id: 1,
        username: "curt",
        firstname: "truc",
        lastname: "is",
        email: "curt@si.com",
        password: "a",
        disabled: false,
        admin: false,
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/ae2a60174729493.Y3JvcCwxOTk5LDE1NjQsMCwyMTc.png",
        registrationDate: new Date("2020-05-02"),
       });
    });
  });

  describe('create', () => {
    it('should throw if email exists', async () => {
      repo.findOne.mockResolvedValueOnce(mockUser1);
      await expect(service.create({ email: mockUser1.email, username: 'nombreEjemplo' }))
        .rejects.toThrow(BadRequestException);
    });

    it('should save user if email is unique', async () => {
      repo.save.mockResolvedValueOnce(mockUser1);
      const mockTestUser = {
        email: "a@b.com",
        username: "nombreEjemplo",
        firstname: "nombreEjemplo",
        lastname: "nombreEjemplo",
        password: "pasEjemplo",
        disabled: false,
        admin: false,
        image: "urlImagen",
        registrationDate: new Date("2020-05-02"),
      };
      const result = await service.create(mockTestUser);
      expect(repo.save).toHaveBeenCalledWith(mockTestUser);
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
      const result = await service.update(1, { email: 'correo@ejemplo.com' });
      expect(repo.update).toHaveBeenCalledWith(1, { email: 'correo@ejemplo.com' });
      expect(result).toEqual(mockUser1);
    });
  });

  describe('delete', () => {
    it('should delete the user', async () => {      
      const mockDeleteResult = { raw: {}, affected: 1 };
      repo.delete.mockResolvedValue(mockDeleteResult as any);
      const result = await service.delete(1);
      expect(repo.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockDeleteResult);
    });
  });
});