import { UsersController } from '../../src/modules/users/user.controller';
import { UsersService } from '../../src/modules/users/user.service';
import { User } from '../../src/entidades/user.entity';
import { UpdateUserDto } from '../../src/modules/users/userDto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: jest.Mocked<UsersService>;

  beforeEach(() => {
    service = {
      findAll: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockResolvedValue({} as User),
      create: jest.fn().mockResolvedValue({} as User),
      update: jest.fn().mockResolvedValue({} as User),
      delete: jest.fn().mockResolvedValue({ affected: 1 }),
    } as any;
    controller = new UsersController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have a method getAllUsers()', async () => {
    expect(typeof controller.getAllUsers).toBe('function');
    const result = await controller.getAllUsers();
    expect(Array.isArray(result)).toBe(true);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should have a method findOne()', async () => {
    expect(typeof controller.findOne).toBe('function');
    const result = await controller.findOne(1);
    expect(result).toBeDefined();
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should have a method create()', async () => {
    expect(typeof controller.create).toBe('function');
    const user: Partial<User> = { username: 'Test User' };
    const result = await controller.create(user);
    expect(result).toBeDefined();
    expect(service.create).toHaveBeenCalledWith(user);
  });

  it('should have a method update()', async () => {
    expect(typeof controller.update).toBe('function');
    const user: Partial<User> = { username: 'Updated User' };
    const result = await controller.update(1, user);
    expect(result).toBeDefined();
    expect(service.update).toHaveBeenCalledWith(1, user);
  });

  it('should have a method delete()', async () => {
    expect(typeof controller.delete).toBe('function');
    const result = await controller.delete(1);
    expect(result).toEqual({ affected: 1 });
    expect(service.delete).toHaveBeenCalledWith(1);
  });

  it('should have a method findAll()', async () => {
    expect(typeof controller.findAll).toBe('function');
    const result = await controller.findAll('search');
    expect(Array.isArray(result)).toBe(true);
    expect(service.findAll).toHaveBeenCalledWith('search');
  });

  it('should have a method updateUserState()', async () => {
    expect(typeof controller.updateUserState).toBe('function');
    const dto: UpdateUserDto = { state: 'active' } as any;
    const result = await controller.updateUserState(1, dto);
    expect(result).toBeDefined();
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('findOne() should return null if user not found', async () => {
    service.findOne.mockResolvedValueOnce(null);
    const result = await controller.findOne(999);
    expect(result).toBeNull();
  });

  it('findAll() should return an array of users', async () => {
    const mockUsers: User[] = [
      { id: 1, username: 'User1' } as any,
      { id: 2, username: 'User2' } as any,
    ];
    service.findAll.mockResolvedValueOnce(mockUsers);
    const result = await controller.getAllUsers();
    expect(result).toEqual(mockUsers);
  });

  it('create() should return the created user', async () => {
    const user: Partial<User> = { username: 'New User' };
    const created: User = { id: 3, username: 'New User' } as any;
    service.create.mockResolvedValueOnce(created);
    const result = await controller.create(user);
    expect(result).toEqual(created);
  });

  it('update() should return the updated user', async () => {
    const user: Partial<User> = { username: 'Updated User' };
    const updated: User = { id: 1, username: 'Updated User' } as any;
    service.update.mockResolvedValueOnce(updated);
    const result = await controller.update(1, user);
    expect(result).toEqual(updated);
  });

  // it('delete() should return affected: 0 if user not found', async () => {
  //   service.delete.mockResolvedValueOnce({ affected: 0 });
  //   const result = await controller.delete(999);
  //   expect(result).toEqual({ affected: 0 });
  // });

  it('updateUserState() should return the updated user state', async () => {
    const dto: UpdateUserDto = { state: 'inactive' } as any;
    const updated: User = { id: 1, username: 'User', state: 'inactive' } as any;
    service.update.mockResolvedValueOnce(updated);
    const result = await controller.updateUserState(1, dto);
    expect(result).toEqual(updated);
  });
});