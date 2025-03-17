import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class AnuService {
  async getEvents(eventName: string = '') {
    const URL =
      'https://www.eventbrite.com/d/united-kingdom--london/jewish-events/';
    const browser = await puppeteer.launch({
      headless: false,
    });
    let data: { title: string; date: string; img: string[] } = {
      title: '',
      date: '',
      img: [],
    };
    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: 'networkidle2' });

    const events = await page.evaluate(() => {
      const properties: { title: string; date: string; img: string[] }[] = [];
      document
        .querySelectorAll('.eds-event-card-content__content')
        .forEach((z) => {
          let tempImgList: string[] = [];

          z.querySelectorAll('.eds-media-card-content__image').forEach((x) => {
            const imgElement = x.querySelector('img');
            if (imgElement && imgElement.src) {
              tempImgList.push(imgElement.src);
            }
          });

          data = {
            title:
              z.querySelector('.eds-event-card__formatted-name--is-clamped')
                ?.textContent || '',
            date: z.querySelector('.eds-text-bs--fixed')?.textContent || '',
            img: tempImgList,
          };
          properties.push(data);
        });
    });

    await browser.close();
    return data;
  }
}
