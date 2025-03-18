import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/common/types/users';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(
    @Body('username') username: User['username'],
    @Body('password') password: User['password'],
  ) {
    return this.authService.signIn(username, password);
  }

  @Post('signup')
  async signUp(
    @Body('username') username: User['username'],
    @Body('password') password: User['password'],
  ) {
    return this.authService.signUp(username, password);
  }
}
