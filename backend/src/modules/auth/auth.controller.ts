import { Body, Controller, Post } from '@nestjs/common';
import { LoginRequestBody, RegisterRequestBody } from './auth.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async loginUser(@Body() requestBody: LoginRequestBody) {
    console.log(requestBody)
    return this.authService.login(requestBody);
  }

  @Post('register')
  async registerUser(@Body() requestBody: RegisterRequestBody) {
    console.log(requestBody)
    return this.authService.register(requestBody);
  }
}

