import { Module } from '@nestjs/common';
import { EventModule } from './events/events.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LoggerModule } from './logger/logger.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    EventModule,
    AuthModule,
    UsersModule,
    LoggerModule,
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
