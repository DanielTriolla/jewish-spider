import { Controller, Get, Query } from '@nestjs/common';
import { AnuService } from './anu.service';

@Controller('anu')
export class AnuController {
  constructor(private readonly anuService: AnuService) {}

  @Get('')
  getEvents(@Query('eventName') eventName: string) {
    return this.anuService.getEvents(eventName);
  }
}
