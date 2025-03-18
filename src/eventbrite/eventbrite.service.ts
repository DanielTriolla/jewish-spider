import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { EventbriteEvent } from './eventbrite.types';
import {
  EVENT_DATE_SELECTOR,
  EVENT_DETAILS_SELECTOR,
  EVENT_LINK_SELECTOR,
  EVENT_PRICE_SELECTOR,
  EVENT_TITLE_SELECTOR,
  EVENTBRITE_URL,
  EVENTSLIST_SELECTOR,
} from './eventbrite.consts';

@Injectable()
export class EventbriteService {
  async getEvents(
    page: string,
    location: string,
    price: string,
    date: string,
    search: string,
  ) {
    const URL = `${EVENTBRITE_URL}/d/${location}/${price + '--'}${date}/${search}/?page=${page}`;
    const browser = await puppeteer.launch({
      headless: true,
    });

    const browserPage = await browser.newPage();

    await browserPage.goto(URL, { waitUntil: 'networkidle2' });

    const events = await browserPage.evaluate(() => {
      const eventCards = document.querySelectorAll(EVENTSLIST_SELECTOR);

      const events: EventbriteEvent[] = [];

      eventCards.forEach((card) => {
        const details = card.querySelector(EVENT_DETAILS_SELECTOR);
        if (!details) return;

        const titleElement = details.querySelector(EVENT_TITLE_SELECTOR);
        const title = titleElement?.textContent?.trim() || '';

        const dateElement = details.querySelector(EVENT_DATE_SELECTOR);
        const date = dateElement?.textContent?.trim() || '';

        const priceElement = card.querySelector(EVENT_PRICE_SELECTOR);

        const price = priceElement?.textContent?.trim() || 'Free';

        const linkElement = details.querySelector(EVENT_LINK_SELECTOR);
        const link = linkElement?.getAttribute('href') || '';

        events.push({ title, date, price, link });
      });

      return events;
    });

    await browser.close();
    return events;
  }
}
