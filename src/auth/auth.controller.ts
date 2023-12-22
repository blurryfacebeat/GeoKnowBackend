import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto): Promise<{ token: string }> {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: AuthDto): Promise<{ accessToken: string }> {
    return this.authService.login(dto);
  }
}
