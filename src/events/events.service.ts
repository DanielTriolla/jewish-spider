import { Injectable } from '@nestjs/common';
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
    let url: string | undefined;

    for (const source of EVENT_SOURCES) {
      if (source.name === 'eventbrite') {
        url = `${source.baseUrl}/d/${location}/${price + '--'}${date}/${search}/?page=${page}`;
      }

      if (url) {
        const events: Event[] = await scrapeEvents(url, source.selectors);
        results.push(...events);
      } else {
        console.warn(`URL is undefined for source: ${source.name}`);
      }
    }

    return results;
  }
}
