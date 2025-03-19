import { Module } from '@nestjs/common';
import { EventbriteController } from './eventbrite.controller';
import { EventbriteService } from './eventbrite.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [JwtModule, ConfigModule],
  controllers: [EventbriteController],
  providers: [EventbriteService],
})
export class EventbriteModule {}
