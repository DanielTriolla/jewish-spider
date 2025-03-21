import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { EventService } from './events.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(AuthGuard)
  @Get()
  getEvents(
    @Query('page') page: string = '1',
    @Query('location') location: string = 'united-kingdom--london',
    @Query('price') price: string = '',
    @Query('date') date: string = 'events--this-month',
    @Query('search') search: string = 'jewish-events',
  ) {
    return this.eventService.fetchEvents(page, location, price, date, search);
  }
}
