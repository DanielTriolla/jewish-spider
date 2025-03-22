import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { EventService } from './events.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetEventsDto } from './dto/event.dto';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  getEvents(@Query(ValidationPipe) query: GetEventsDto) {
    const {
      page = '1',
      location = 'united-kingdom--london',
      price = 'free',
      date = 'events--this-month',
      search = 'jewish-events',
    } = query;
    return this.eventService.fetchEvents(page, location, price, date, search);
  }
}
