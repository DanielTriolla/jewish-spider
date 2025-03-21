import { EventSourcesType } from 'src/common/types/event-sources';

export const EVENT_SOURCES: EventSourcesType[] = [
  {
    name: 'eventbrite',
    baseUrl: 'https://www.eventbrite.com',
    selectors: {
      EVENTSLIST_SELECTOR:
        '.SearchResultPanelContentEventCardList-module__eventList___2wk-D > li',
      EVENT_DETAILS_SELECTOR: '.event-card-details',
      EVENT_TITLE_SELECTOR: 'h3',
      EVENT_DATE_SELECTOR: 'p:nth-child(2)',
      EVENT_PRICE_SELECTOR:
        '.DiscoverHorizontalEventCard-module__priceWrapper___3rOUY',
      EVENT_LINK_SELECTOR: 'a.event-card-link',
    },
  },
];
