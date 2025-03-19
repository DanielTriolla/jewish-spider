import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/common/types/users';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: '1234',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'Aa1234',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async create(username: string, password: string): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser: User = {
      userId: this.users.length + 1,
      username,
      password: hashedPassword,
    };

    this.users.push(newUser);
    return newUser;
  }
}
