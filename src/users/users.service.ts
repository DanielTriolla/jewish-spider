import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/common/types/users';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(username: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { username } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(userData: CreateUserDto): Promise<User> {
    try {
      const { username, password } = userData;

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser: User = {
        username,
        password: hashedPassword,
      };

      return await this.prisma.user.create({ data: newUser });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('User already exists');
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
}
