import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/common/types/users';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(username: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { username } });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async create(userData: CreateUserDto): Promise<User> {
    const { username, password } = userData;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser: User = {
      username,
      password: hashedPassword,
    };

    return this.prisma.user.create({ data: newUser });
  }
}
