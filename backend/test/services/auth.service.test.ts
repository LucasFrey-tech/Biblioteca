import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/modules/auth/auth.service';
import { Repository } from 'typeorm';
import { User } from '../../src/entidades/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockNewUser, mockUser1, mockUsersRepository } from '../mocks/repositories/users.repository.mock';
import { UsersService } from '../../src/modules/users/user.service';
import { mockUsersService } from '../mocks/services/users.service.mock';
import { JwtService } from '@nestjs/jwt';
import { mockJwtService } from '../mocks/services/jwtservice.service.mock';

jest.mock('bcrypt', () => ({
  compare: jest.fn(async () => true),
  hash: jest.fn(async (pw: string) => `hashed_${pw}`),
}));

describe('AuthService', () => {
  let service: AuthService;
  let repo: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repo = module.get(getRepositoryToken(User));
    
    });
  
    it('test method register()', async () => {
      expect(service.register).toBeTruthy()
    });
  
    it('test method login()', async () => {
      expect(service.login).toBeTruthy()
    });
  
    it('test method validateUser()', async () => {
      expect(service.validateUser).toBeTruthy()
    });
  });