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
    mockUsersService.findByEmail = jest.fn().mockResolvedValue(null)
    mockUsersService.findByUser = jest.fn().mockResolvedValue(null)
    const result = service.register({
      username: 'usuario',
      firstname: 'nombre',
      lastname: 'apellido',
      email: 'z@x.com',
      password: '1234'
    })
    expect(service.register).toBeTruthy()
  });
  
  it('test method login()', async () => {
    mockUsersService.findByEmail = jest.fn().mockResolvedValue(mockUser1)
    const result = service.login({
      email: 'curt@si.com',
      password: '12345678'
    })
    expect(mockUsersService.findByEmail).toHaveBeenCalled()
    expect(service.login).toBeTruthy()
  });
  
  it('test method validateUser()', async () => {
    const result = service.validateUser("curt@si.com", "12345678");
    expect(mockUsersService.findByEmail).toHaveBeenCalled()
    expect(service.validateUser).toBeTruthy()
  });
});