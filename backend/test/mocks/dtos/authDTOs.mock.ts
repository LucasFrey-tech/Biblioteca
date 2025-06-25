import { LoginRequestBody, RegisterRequestBody } from "src/modules/auth/dto/auth.dto";


export const mockDtoLogin: LoginRequestBody = {
    email: "usuario@agregados.com",
    password: "12345678"
}

export const mockDtoRegister: RegisterRequestBody = {
    username: "Usuario",
    firstname: "Agregado",
    lastname: "Agregado",
    email: "usuario@agregados.com",
    password: "12345678"
}