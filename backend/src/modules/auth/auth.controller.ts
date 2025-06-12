import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginRequestBody, RegisterRequestBody } from './auth.interface';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Autorización')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Iniciar Sesión' })
  @ApiParam({ name: 'login', type: LoginDto })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login Exitoso', type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registro de Usuario' })
  @ApiParam({ name: 'requestBody', type: RegisterRequestBody })
  @ApiBody({ type: RegisterRequestBody })
  @ApiResponse({ status: 200, description: 'Registro Exitoso', type: RegisterRequestBody })
  async registerUser(@Body() requestBody: RegisterRequestBody) {
    return this.authService.register(requestBody);
  }
}

