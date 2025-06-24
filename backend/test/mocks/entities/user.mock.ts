import { User } from "src/entidades/user.entity";

export const mockUser1: User = {
    id: 1,
    username: "curt",
    firstname: "truc",
    lastname: "is",
    email: "curt@si.com",
    password: "a",
    admin: false,
    disabled: false,
    registrationDate: new Date("2020-05-02"),
    userSubscriptions: []
};

export const mockUser2:User = {
    id: 2,
    username: "pepe",
    firstname: "pepe",
    lastname: "no",
    email: "pepe@no.com",
    password: "si",
    admin: false,
    disabled: false,
    registrationDate: new Date("2020-05-02"),
    userSubscriptions: []
};

export const mockUser3:User = {
    id: 3,
    username: "jorge",
    firstname: "armando",
    lastname: "paredes",
    email: "jorge@paredes.com",
    password: "si",
    admin: false,
    disabled: false,
    registrationDate: new Date("2020-05-02"),
    userSubscriptions: []
};

export const mockNewUser:User = {
    id: 4,
    username: "Usuario",
    firstname: "Agregado",
    lastname: "Agregado",
    email: "usuario@agregados.com",
    password: "si",
    admin: false,
    disabled: false,
    registrationDate: new Date("2020-05-02"),
    userSubscriptions: []
};

export const idMockedUpdatedUser = 1
export const mockUpdatedUser:User = {
    id: 1,
    username: "actualizado",
    firstname: "truc",
    lastname: "actualizado",
    email: "curt@si.com",
    password: "a",
    admin: false,
    disabled: false,
    registrationDate: new Date("2020-05-02"),
    userSubscriptions: []
};

export const mockUsers = [mockUser1, mockUser2, mockUser3];