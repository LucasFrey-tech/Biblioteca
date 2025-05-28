import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginRequestBody, RegisterRequestBody } from './auth.interface';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

@Post('login')
@HttpCode(200) // 
async login(@Body() loginDto: LoginDto) {
  return this.authService.login(loginDto);
}

  @Post('register')
  async registerUser(@Body() requestBody: RegisterRequestBody) {
    return this.authService.register(requestBody);
  }
}

