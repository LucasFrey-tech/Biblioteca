import { Test } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../src/modules/auth/auth.service';
import { AuthController } from '../src/modules/auth/auth.controller';
import { UsersService } from '../src/modules/users/user.service';


describe('AuthService', () => {
  let instance;

  beforeEach(async () => {
    const mockUsersService = {
      // mock methods as needed
      findOne: jest.fn(),
      create: jest.fn(),
    };

    const mockConfigService = {
      get: jest.fn((key) => {
        if (key === 'JWT_SECRET') return 'test_secret';
        return null;
      }),
    };

    const moduleRef = await Test.createTestingModule({
        imports: [
            PassportModule,
            JwtModule.register({
              secret: 'test_secret',
              signOptions: { expiresIn: '2h' },
            }),
          ],
          controllers: [AuthController],
          providers: [
            AuthService,
            { provide: UsersService, useValue: mockUsersService },
            { provide: ConfigService, useValue: mockConfigService },
          ],
      }).compile();

    instance =  moduleRef.get(AuthService);
  });
  it('instance should be an instanceof AuthService', () => {
    expect(instance instanceof AuthService).toBeTruthy();
  });

  it('should have a method register()', async () => {
    expect(instance.register).toBeTruthy();
  });

  it('should have a method login()', async () => {
    expect(instance.login).toBeTruthy();
  });

  it('should have a method validateUser()', async () => {
    expect(instance.validateUser).toBeTruthy();
  });
});