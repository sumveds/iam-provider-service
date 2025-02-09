import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard, Public } from 'nest-keycloak-connect';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { username, password } = loginDto;
    return this.authService.authenticate(username, password);
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@Body('refreshToken') refreshToken: string) {
    if (!refreshToken) {
      return { message: 'Refresh token is required' };
    }
    return this.authService.logout(refreshToken);
  }
}
