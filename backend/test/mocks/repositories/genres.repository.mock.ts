import { Genre } from "src/entidades/genre.entity";

export const mockGenre1:Genre = {
    id: 1,
    name:  "Accion"
};

export const mockGenre2:Genre = {
    id: 2,
    name:  "Aventura"
};

export const mockGenre3:Genre = {
    id: 3,
    name:  "Misterio"
};

export const mockGenres = [mockGenre1, mockGenre2, mockGenre3];


export const mockGenresRepository = {
find: jest.fn().mockResolvedValue(mockGenres),
findAndCount: jest.fn().mockResolvedValue(mockGenres),
create: jest.fn().mockResolvedValue(mockGenres),
delete: jest.fn().mockResolvedValue(mockGenres),
save: jest.fn().mockResolvedValue(mockGenres),
};