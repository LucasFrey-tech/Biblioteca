import { mockNewUser, mockUpdatedUser, mockUser1, mockUser2, mockUser3, mockUsers } from "../repositories/users.repository.mock";

export const mockUsersService = {
    findAll: jest.fn().mockResolvedValue(mockUsers),
    findOne: jest.fn().mockResolvedValue(mockUser1),
    findByEmail: jest.fn().mockResolvedValue(mockUser1),
    findByUser: jest.fn().mockResolvedValue(mockUser1),
    create: jest.fn().mockResolvedValue(mockNewUser),
    update: jest.fn().mockResolvedValue(mockUpdatedUser),
    delete: jest.fn().mockResolvedValue({affected:1}),
  };