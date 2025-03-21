import { Module } from '@nestjs/common';
import { EventController } from './events.controller';
import { EventService } from './events.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [JwtModule, ConfigModule],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
