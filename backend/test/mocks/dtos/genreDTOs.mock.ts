import { Genre } from "src/entidades/genre.entity";

export const mockDtoNewGenre:Genre ={
    id: 4,
    name: "new genre"
}

export const mockDtoGenre1:Genre = {
    id: 1,
    name:  "Accion"
};

export const mockDtoGenre2:Genre = {
    id: 2,
    name:  "Aventura"
};

export const mockDtoGenre3:Genre = {
    id: 3,
    name:  "Misterio"
};

export const mockGenres = [mockDtoGenre1, mockDtoGenre2, mockDtoGenre3];