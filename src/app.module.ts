import { Module } from '@nestjs/common';
import { EventbriteModule } from './eventbrite/eventbrite.module';

@Module({
  imports: [EventbriteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
