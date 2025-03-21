import puppeteer from 'puppeteer';

import { ServiceUnavailableException } from '@nestjs/common';
import { EventSourcesType } from 'src/common/types/event-sources';

import { Event } from '../interfaces/event.interface';

export async function scrapeEvents(
  url: string,
  selectors: EventSourcesType['selectors'],
) {
  const browser = await puppeteer.launch({ headless: true });
  const browserPage = await browser.newPage();

  try {
    await browserPage.goto(url, { waitUntil: 'networkidle2' });

    const events = await browserPage.evaluate((selectors) => {
      const eventCards = document.querySelectorAll(
        selectors.EVENTSLIST_SELECTOR,
      );
      const events: Event[] = [];

      eventCards.forEach((card) => {
        const details = card.querySelector(selectors.EVENT_DETAILS_SELECTOR);
        if (!details) return;

        const titleElement = details.querySelector(
          selectors.EVENT_TITLE_SELECTOR,
        );
        const title = titleElement?.textContent?.trim() || '';

        const dateElement = details.querySelector(
          selectors.EVENT_DATE_SELECTOR,
        );
        const date = dateElement?.textContent?.trim() || '';

        const priceElement = card.querySelector(selectors.EVENT_PRICE_SELECTOR);
        const price = priceElement?.textContent?.trim() || 'Free';

        const linkElement = details.querySelector(
          selectors.EVENT_LINK_SELECTOR,
        );
        const link = linkElement?.getAttribute('href') || '';

        events.push({ title, date, price, link });
      });

      return events;
    }, selectors);

    return events;
  } catch (e) {
    throw new ServiceUnavailableException('Scraping error');
  } finally {
    await browser.close();
  }
}
