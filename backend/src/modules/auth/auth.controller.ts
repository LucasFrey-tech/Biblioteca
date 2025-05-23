import { Body, Controller, Post } from '@nestjs/common';
import { LoginRequestBody,RegisterRequestBody } from './auth.interface';
import { AuthService } from "./auth.service"

@Controller('login')
export class LoginController {
    constructor(private authService: AuthService) {}

    @Post()
    loginUser(@Body() requestBody: LoginRequestBody): {} {
        this.authService.Login(requestBody);
        return 'This action returns all cats';
    }
}

@Controller('register')
export class RegisterController {
    constructor(private authService: AuthService) {}
    
    @Post()
    registerUser(@Body() requestBody: RegisterRequestBody): {} {
        this.authService.Register(requestBody);
        return 'This action returns all cats';
    }
}