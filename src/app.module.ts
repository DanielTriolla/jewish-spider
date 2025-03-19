import { Module } from '@nestjs/common';
import { EventbriteModule } from './eventbrite/eventbrite.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [EventbriteModule, AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
