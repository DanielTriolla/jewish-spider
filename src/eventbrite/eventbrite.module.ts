import { Module } from '@nestjs/common';
import { EventbriteController } from './eventbrite.controller';
import { EventbriteService } from './eventbrite.service';

@Module({
  controllers: [EventbriteController],
  providers: [EventbriteService],
})
export class EventbriteModule {}
