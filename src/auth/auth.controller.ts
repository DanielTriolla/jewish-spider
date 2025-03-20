import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/common/types/users';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signin')
  async signIn(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.authService.signIn(createUserDto);
  }

  @Public()
  @Post('signup')
  async signUp(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }
}
