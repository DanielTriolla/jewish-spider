import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/common/types/users';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: User['username'], pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.userId };
    const accessToken = await this.jwtService.signAsync(payload);

    const { password, ...result } = user;
    return {
      access_token: accessToken,
      user: result,
    };
  }

  async signUp(
    username: User['username'],
    password: User['password'],
  ): Promise<any> {
    const existingUser = await this.usersService.findOne(username);
    if (existingUser) {
      throw new UnauthorizedException('Username already exists');
    }

    const user = await this.usersService.create(username, password);
    const { password: _, ...result } = user;
    return result;
  }
}
