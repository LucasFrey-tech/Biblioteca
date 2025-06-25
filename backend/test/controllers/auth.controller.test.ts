import { AuthController } from "../../src/modules/auth/auth.controller";
import { AuthService } from "../../src/modules/auth/auth.service";
import { LoginRequestBody, RegisterRequestBody } from "../../src/modules/auth/dto/auth.dto";

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(() => {
    authService = {
      login: jest.fn(),
      register: jest.fn(),
    } as any;
    controller = new AuthController(authService);
  });

  it('instance should be an instanceof AuthController', () => {
    expect(controller instanceof AuthController).toBeTruthy();
  });

  it('should have a method login()', () => {
    expect(typeof controller.login).toBe('function');
  });

  it('should have a method registerUser()', () => {
    expect(typeof controller.registerUser).toBe('function');
  });

  it('should call authService.login with correct params', async () => {
    const loginDto: LoginRequestBody = { username: 'user', password: 'pass' } as any;
    (authService.login as jest.Mock).mockResolvedValue({ token: 'jwt' });
    const result = await controller.login(loginDto);
    expect(authService.login).toHaveBeenCalledWith(loginDto);
    expect(result).toEqual({ token: 'jwt' });
  });

  it('should call authService.register with correct params', async () => {
    const registerDto: RegisterRequestBody = { username: 'user', password: 'pass', email: 'test@mail.com' } as any;
    (authService.register as jest.Mock).mockResolvedValue({ id: 1, ...registerDto });
    const result = await controller.registerUser(registerDto);
    expect(authService.register).toHaveBeenCalledWith(registerDto);
    expect(result).toEqual({ id: 1, ...registerDto });
  });

  it('login should throw if authService.login throws', async () => {
    const loginDto: LoginRequestBody = { username: 'user', password: 'pass' } as any;
    (authService.login as jest.Mock).mockRejectedValue(new Error('Invalid credentials'));
    await expect(controller.login(loginDto)).rejects.toThrow('Invalid credentials');
  });

  it('registerUser should throw if authService.register throws', async () => {
    const registerDto: RegisterRequestBody = { username: 'user', password: 'pass', email: 'test@mail.com' } as any;
    (authService.register as jest.Mock).mockRejectedValue(new Error('User exists'));
    await expect(controller.registerUser(registerDto)).rejects.toThrow('User exists');
  });
});