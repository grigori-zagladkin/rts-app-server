import { Event } from '@prisma/client';

export enum SortEvents {
  ALL = 'all',
  ACTIVE = 'active',
  FINISHED = 'finished',
}

export class EventDto implements Omit<Event, 'id' | 'updatedAt' | 'createdAt'> {
  slug: string;
  description: string;
  title: string;
  date: string;
  imagesPath: string[];
  status: boolean;
}
