import { Injectable } from '@nestjs/common';
import { HttpClientService } from 'src/http-client/http-client.service';
import { EVENT_SOURCES } from 'src/config/events.config';
import { scrapeEvents } from 'src/common/utils/scraper';

import { Event } from 'src/common/interfaces/event.interface';

@Injectable()
export class EventService {
  async fetchEvents(
    page: string,
    location: string,
    price: string,
    date: string,
    search: string,
  ): Promise<Event[]> {
    const results: Event[] = [];

    for (const source of EVENT_SOURCES) {
      const url = `${source.baseUrl}/d/${location}/${price + '--'}${date}/${search}/?page=${page}`;
      const events: Event[] = await scrapeEvents(url, source.selectors);
      results.push(...events);
    }

    return results;
  }
}
