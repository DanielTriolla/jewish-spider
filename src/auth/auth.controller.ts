import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/common/types/users';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signin')
  async signIn(
    @Body('username') username: User['username'],
    @Body('password') password: User['password'],
  ) {
    return this.authService.signIn(username, password);
  }

  @Public()
  @Post('signup')
  async signUp(
    @Body('username') username: User['username'],
    @Body('password') password: User['password'],
  ) {
    return this.authService.signUp(username, password);
  }
}
