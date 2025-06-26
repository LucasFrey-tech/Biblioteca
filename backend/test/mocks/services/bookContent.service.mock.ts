
export const mockBookContentService = {
      get: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      bookContentUrl: jest.fn((filename: string) => `mocked/url/${filename}`),
    } as any;