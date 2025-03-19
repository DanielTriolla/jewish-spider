import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { EventbriteService } from './eventbrite.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('eventbrite')
export class EventbriteController {
  constructor(private readonly eventbriteService: EventbriteService) {}

  @UseGuards(AuthGuard)
  @Get()
  getEvents(
    @Query('page') page: string = '1',
    @Query('location') location: string = 'united-kingdom--london',
    @Query('price') price: string = '',
    @Query('date') date: string = 'events--this-month',
    @Query('search') search: string = 'jewish-events',
  ) {
    return this.eventbriteService.getEvents(
      page,
      location,
      price,
      date,
      search,
    );
  }
}
