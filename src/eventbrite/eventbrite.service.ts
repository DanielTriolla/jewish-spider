import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class EventbriteService {
  async getEvents(
    page: string,
    location: string,
    price: string,
    date: string,
    search: string,
  ) {
    const URL = `https://www.eventbrite.com/d/${location}/${price + '--'}${date}/${search}/?page=${page}`;
    const browser = await puppeteer.launch({
      headless: true,
    });

    const browserPage = await browser.newPage();

    await browserPage.goto(URL, { waitUntil: 'networkidle2' });

    const events = await browserPage.evaluate(() => {
      const eventCards = document.querySelectorAll(
        '.SearchResultPanelContentEventCardList-module__eventList___2wk-D > li',
      );

      const events: {
        title: string;
        date: string;
        price: string;
        link: string;
      }[] = [];

      eventCards.forEach((card) => {
        const details = card.querySelector('.event-card-details');
        if (!details) return;

        // Extract title
        const titleElement = details.querySelector('h3');
        const title = titleElement?.textContent?.trim() || '';

        // Extract date
        const dateElement = details.querySelector('p:nth-child(2)');
        const date = dateElement?.textContent?.trim() || '';

        // Extract price
        const priceElement = card.querySelector(
          '.DiscoverHorizontalEventCard-module__priceWrapper___3rOUY',
        );

        const price = priceElement?.textContent?.trim() || 'Free';

        const linkElement = details.querySelector('a.event-card-link');
        const link = linkElement?.getAttribute('href') || '';

        events.push({ title, date, price, link });
      });

      return events;
    });

    await browser.close();
    return events;
  }
}
